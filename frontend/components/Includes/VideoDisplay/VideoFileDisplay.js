import { backEndUrl, log } from '@/Constants';
import React, { useState, useEffect } from 'react';

// Helper function to format the duration
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60)
  const seconds = Math.floor(duration % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
};

// The VideoFile component
export default function VideoFileDisplay({ file, handleRemoveMedia, videoMeta }) {
  const [videoDuration, setVideoDuration] = useState(null);
  const videoRef = React.createRef();

  // Calculate duration once the component mounts
  useEffect(() => {
    const videoElement = videoRef.current;
    log(backEndUrl + file.attributes.url);
    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', () => {
        setVideoDuration(videoElement.duration);
      });

      return () => {
        videoElement.removeEventListener('loadedmetadata', () => {
          setVideoDuration(videoElement.duration);
        });
      };
    }
  }, []);
  const VideoDisplay = ()=>{
    if(!videoMeta){
        return "flex"
    }
    if(!videoMeta.mediaDisplayType){
        return "flex"
    }
    else{
        if(videoMeta.mediaDisplayType === "landscape"){
           return "block"
        }
        else{
            return "flex"
        }
    }
    
  }
  return (
    <div id={"#media-" + file.id} style={{width:'100%', marginTop: '2px', padding: "10px", borderBottom: "1px solid ghostwhite"}}>
        <div  style={{ display: VideoDisplay(), alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ flexGrow: 1, paddingRight:'5px', marginBottom:'5px' }}>
                <p><strong>File Name:</strong> {file.attributes.name}</p>
                <p><strong>Duration:</strong> {videoDuration ? formatDuration(videoDuration) : 'Loading...'}</p>
            </div>
            <div>
                <video ref={videoRef} controls style={{ maxWidth: '280px', maxHeight: '180px' }}>
                    <source src={backEndUrl + file.attributes.url} type={file.attributes.mime} />
                    Sorry we are unable to show this video
                </video>
            </div>
            
        </div>
        <button
        onClick={() => handleRemoveMedia(file.id)}
        style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer'
        }}
    >
        Remove
    </button>
    </div>
  )
}
