import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import { api_url, getJwt, log } from '@/Constants';
import { getPostFromId } from '@/Functions';

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

export default function Uploader(props) {
  const [videoDimensions, setVideoDimensions] = useState(null); // Store video dimensions
  const maxFileSize = '20MB'; // 10MB limit for upload

  // Function to check if the file is a video or image and get its dimensions
  const checkFileDimensions = (file) => {
    if (file.type.startsWith('video/')) {
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(file);
      videoElement.onloadedmetadata = () => {
        const width = videoElement.videoWidth;
        const height = videoElement.videoHeight;
        setVideoDimensions({ width, height });

        log(`This video is in ${height > width ? 'portrait' : 'landscape'} mode.`);
      };
    } else if (file.type.startsWith('image/')) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        setVideoDimensions({ width, height });

        log(`This image is in ${height > width ? 'portrait' : 'landscape'} mode.`);
      };
    }
  };

  const handleProcess = async (fieldName, file, metadata, load, error, progress, abort) => {
    const formData = new FormData();
    formData.append(props.allowMultiple ? 'files[]' : 'files', file);
    formData.append('refId', props.refId.toString());
    formData.append('ref', props.refName);
    formData.append('field', props.fieldName);

    const request = new XMLHttpRequest();
    request.open('POST', `${api_url}/upload`);
    request.setRequestHeader('Authorization', `Bearer ${getJwt()}`);

    request.upload.onprogress = (e) => {
      progress(e.lengthComputable, e.loaded, e.total);
    };

    request.onload = async function () {
      if (request.status >= 200 && request.status < 300) {
        if(props.refName === "plugin::users-permissions.user"){ // means a user is updating their profile pic
          const responseData = await JSON.parse(request.responseText)
          props.addProfilePicture(responseData[0])
          load(request.responseText)
          return
        }
        const responseData = await JSON.parse(request.responseText);
        log(responseData)
        log(props.refId)
        const uploadId = responseData[0].id;
        if (videoDimensions) {
          log(videoDimensions.width,videoDimensions.height)
          let mediaDisplayType = videoDimensions.height > videoDimensions.width ? 'portrait' : 'landscape' 
          let mediaObject = {
            videos: {
              [uploadId]:{
                  media_type: file.type,
                  mediaDisplayType: mediaDisplayType,
                  id:uploadId,
                  width: videoDimensions.width,
                  height: videoDimensions.height
              }
            }  
          }
          if(file.type.startsWith('image/')){
            mediaObject = {
              images: {
                [uploadId]:{
                  media_type: file.type,
                  mediaDisplayType: mediaDisplayType,
                  id:uploadId,
                  width: videoDimensions.width,
                  height: videoDimensions.height
                }
              }  
            }
          }
          try {
            const post = await getPostFromId(props.refId)
            log(post)
            if(post.mediaDisplayType){
              if(post.mediaDisplayType === "portrait"){ // means one of the video files is portrait, so entire post cannot be displayed as landscape
                mediaDisplayType = "portrait"
                return
              }
            }
            let updateData = {}
            if(!post.extra_payload){
                updateData =  {data: { mediaDisplayType: mediaDisplayType,extra_payload: { media: mediaObject } } }
            }
            else{
              if(!post.extra_payload.media){
                updateData =  {data: { mediaDisplayType: mediaDisplayType,extra_payload: { media: mediaObject } } }
              }
              else{
                if(file.type.startsWith('image/')){
                     if(!post.extra_payload.media.images){ // if images exist already in extra_payload
                        post.extra_payload.media["images"] = mediaObject.images
                        updateData = {data: { mediaDisplayType: mediaDisplayType,extra_payload: post.extra_payload } }
                     }
                     else{
                        post.extra_payload.media.images[uploadId] = mediaObject.images[uploadId]
                        updateData = {data: { mediaDisplayType: mediaDisplayType,extra_payload: post.extra_payload } }
                     }
                }
                else{ //if videos exist already in extra_payload
                     if(!post.extra_payload.media.videos){
                        post.extra_payload.media["videos"] = mediaObject.videos
                        updateData = {data: { mediaDisplayType: mediaDisplayType,extra_payload: post.extra_payload } }
                     }
                     else{
                        post.extra_payload.media.videos[uploadId] = mediaObject.videos[uploadId]
                        updateData = {data: { mediaDisplayType: mediaDisplayType,extra_payload: post.extra_payload } }
                     }
                }
              }
            }
            
            const updateResponse = await fetch(`${api_url}/posts/${props.refId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJwt()}`,
              },
              body: JSON.stringify(updateData),
            });

            const updateResult = await updateResponse.json();
            log('Update successful:', updateResult);
          } catch (err) {
            console.error('Update failed:', err);
          }
        }

        if (props.addMediaOnUpload) {
          props.addMediaOnUpload();
        }
        load(request.responseText);
      } else {
        error('Upload failed');
      }
    };

    request.onerror = () => error('Upload error');
    request.onabort = () => abort();

    request.send(formData);

    return {
      abort: () => {
        request.abort();
        abort();
      },
    };
  };

  const uploaderClassName = props.displayType === 'circular' ? 'filepond--circle' : '';

  return (
    <FilePond
      className={uploaderClassName}
      allowMultiple={props.allowMultiple}
      maxFileSize={maxFileSize}
      acceptedFileTypes={props.allowedTypes}
      server={{
        url: `${api_url}/upload`,
        process: handleProcess,
      }}
      onaddfile={(error, file) => checkFileDimensions(file.file)} // Call checkFileDimensions only for videos/images
      stylePanelLayout={props.displayType}
    />
  );
}
