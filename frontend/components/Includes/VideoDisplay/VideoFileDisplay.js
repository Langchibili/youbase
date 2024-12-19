'use client';

import ViewsDisplay from '@/components/Parts/EngageMents/ViewsDisplay';
import { backEndUrl, log } from '@/Constants';
import { getPostMedia, getVideoThumbnail } from '@/Functions';
import React, { useState, useEffect, useRef } from 'react';
import VideojsPlayer from './VideojsPlayer';
import { maxHeight, width } from '@mui/system';

// Helper function to format the duration
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function VideoFileDisplay({ file, post, loggedInUser, handleRemoveMedia, videoMeta, hideRemoveButton, getMedia, postTitle }) {
  const [videoDurations, setVideoDurations] = useState({}); // Object to store durations per video
  const [currentTime, setCurrentTime] = useState({});
  const [videoFile, setVideoFile] = useState(null);
  const videoRefs = useRef([]); // Array to store refs for multiple video elements
  const [logView, setLogView] = useState(false)
  const [OwlCarousel, setOwlCarousel] = useState(null);

  useEffect(() => {
    // Dynamically import OwlCarousel and the styles only on the client side
    if (typeof window !== 'undefined') {
      if(OwlCarousel){
        return
      }
      (async () => {
        const { default: Owl } = await import('react-owl-carousel');
        // await import('owl.carousel/dist/assets/owl.carousel.css');
        // await import('owl.carousel/dist/assets/owl.theme.default.css');
        setOwlCarousel(() => Owl)
      })();
    }

    if(getMedia){
      const runGetMedia = async()=> {
        const media = await getPostMedia(postTitle);
        setVideoFile({ data: media });
        console.log(media);
      }
      runGetMedia();
    } else {
      setVideoFile(file?.attributes ? file.attributes : file);
    }
  }, [file, getMedia, document]);

  useEffect(() => {
    if (videoFile && videoFile.data && videoFile.data.length) {
      videoFile.data.forEach((video, index) => {
        const videoElement = videoRefs.current[index];
        if (videoElement) {
          videoElement.onloadedmetadata = () => {
            setVideoDurations((prevDurations) => ({
              ...prevDurations,
              [index]: videoElement.duration,
            }));
          }

          videoElement.ontimeupdate = (e) => {
            const progress = (e.target.currentTime / e.target.duration) * 100;
            setCurrentTime((prevTimes) => ({
              ...prevTimes,
              [index]: e.target.currentTime,
            }));
            if (progress >= 30) {
              setLogView(true)
            }
          }
        }
      })
    }
  }, [videoFile]);

  // useEffect(() => {
    
  // }, [document])

  if (!OwlCarousel) {
    return <PortraitContentSkeleton/> // loading carousel
  }

  const videoWrapperHeight = (videosLength)=>{
    if(videosLength === 1){
       if(window.innerWidth > 990){
         return "400px"
       }
       return (window.innerWidth - 70).toString() + "px"
    }
    else{
      if(window.innerWidth > 990){
        return "400px"
     }
     else{
       return (window.innerWidth - 70).toString() + "px"
     }
    }
  }
  const renderVideoCarousel = (videos) => {
    let backendUrl = ''
    if (!hideRemoveButton) {// this is for the small thumbnails shown on the post creation screen(page)
      backendUrl = videos.provider === "aws-s3"? '' : backEndUrl
      const videoBackGroundStyles = {
        backgroundImage: "url("+getVideoThumbnail(videos,post)?getVideoThumbnail(videos,post):""+")"
      }
      return (
        <div>
          <video ref={(el) => videoRefs.current[0] = el} controls style={{ maxWidth: '280px', maxHeight: '180px',...videoBackGroundStyles }}>
            <source src={backendUrl + videos.url} type={videos.mime} />
            Sorry, we are unable to show this video.
          </video>
        </div>
      )
    }
    if (!videos.data) return null; // no video or videos, then don't bother
    if(videos.data.length === 1){
          const video = videos.data[0] // the video here is the first video, because it's the only one
          if(video){
            if(!video.hasOwnProperty('attributes')){ // since we are using video.attributes below, structure the video that way to properly work on it
              video.attributes = video
            }
          }
          const videoData = video.attributes;
          videoData.id = video.id
          backendUrl = videoData.provider === "aws-s3"? '' : backEndUrl

          return (<VideojsPlayer height="720px" width="1200px"  video={videoData} formats={videoData.formats} poster={getVideoThumbnail(videoData,post)} videoStyles={{ borderRadius: '5px', width: '100%',objectFit: "cover" }} posterStyles={{objectFit: "cover",width:'100%'}}/>)
    }
    if(typeof window !== "undefined"){ // bellow is for videos with more than one file, displayed using a corousel
      return (
        <OwlCarousel margin={10} items={10} dots={true} autoWidth={true} className="owl-theme">
              {videos.data.map((video, index) => {
                if(video){
                  if(!video.hasOwnProperty('attributes')){ // since we are using video.attributes below, structure the video that way to properly work on it
                    video.attributes = video
                  }
                }
                else{
                  return null
                }
                const videoData = video.attributes;
                videoData.id = video.id
                backendUrl = videoData.provider === "aws-s3"? '' : backEndUrl
                const videoBackGroundStyles = {
                  backgroundImage: "url("+getVideoThumbnail(videoData,post)?getVideoThumbnail(videoData,post):""+")"
                }
                return (
                  <div className="item" key={index} style={{width:videoWrapperHeight(videos.data.length)}}>
                     <div className="stream_1" style={{width:videoWrapperHeight(videos.data.length),padding:'10px'}}>
                      <VideojsPlayer video={videoData} formats={videoData.formats} poster={getVideoThumbnail(videoData,post)} videoStyles={{ borderRadius: '5px', width: '100%',objectFit: "cover", height: '60vh' }} posterStyles={{objectFit: "cover"}}/>
                     </div>
                  </div>)
                return ( // this is mainly being used to display landscape videos
                    <div className="item" key={index} style={{width:videoWrapperHeight(videos.data.length),...videoBackGroundStyles}}>
                     <div className="stream_1" style={{width:videoWrapperHeight(videos.data.length),padding:'10px'}}>
                        <video
                          ref={(el) => videoRefs.current[index] = el}
                          controls
                          style={{ borderRadius: '5px', width: '100%', maxHeight: '500px' }}
                        >
                          <source src={backendUrl + videoData.url} type={videoData.mime} />
                          Sorry, we are unable to show this video.
                        </video>
                        <small>Duration: {videoDurations[index] ? formatDuration(videoDurations[index]) : 'Loading...'}</small>
                      </div>
                    </div>
                )
              })}
              {/* {
                videos.data.map((video, index) => {
                  return (
                    <div>
                    <button role="button" className="owl-dot">
                      <span />
                    </button>
                    <button role="button" className="owl-dot">
                      <span />
                    </button>
                  </div>
                  )
                })
              } */}
            </OwlCarousel>
      );
    }
    else{
      return <></>
    }
  }

  if (!videoFile) return null;

  return (
    <div
      id={!hideRemoveButton ? "#media-" + file.id : ""}
      style={{
        width: '100%',
        marginTop: '2px',
        padding: hideRemoveButton ? 'none' : '10px',
        borderBottom: '1px solid ghostwhite',
      }}
    >
      <ViewsDisplay post={post} loggedInUser={loggedInUser} logView={logView} autoLogView={true}/>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        {!hideRemoveButton && (
          <div style={{ flexGrow: 1, paddingRight: '5px', marginBottom: '5px' }}>
            <p><strong>File Name:</strong> {videoFile.name}</p>
          </div>
        )}
        {renderVideoCarousel(videoFile) /* this can be a single file or an array of files */}
      </div>
      {!hideRemoveButton && (
        <button
          onClick={() => handleRemoveMedia(file.id)}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
}


const PortraitContentSkeleton = ()=>{ // this is a skeleton to show while content loads
  return (
    <div className="la5lo1" style={{marginBottom:'10px'}}>
        <div className="owl-carousel live_stream owl-theme owl-loaded owl-drag">
       
        <div className="owl-stage-outer">
         <div
            className="owl-stage"
            style={{
            transform: "translate3d(0px, 0px, 0px)",
            transition: "all",
            width: "1841px",
            backgroundColor: '#rgb(71 55 71)'
            }}
            
        >
            {[1,2,3,4,5,6,7,8,9].map((skeleton,index)=>{
                  return (
                    <div className="owl-item active" key={index} style={{width:'100%',height:'100px',marginRight:'10px'}}>
                      
                        <div className="stream_1" style={{width:'100%',padding:'10px',height:'100px'}}>
                         
                      </div>
                    </div>
                  )
            })}
        </div>
      </div>
    </div>
    </div>
  )
}