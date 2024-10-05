'use client'

import { backEndUrl } from '@/Constants';
import { truncateText } from '@/Functions';
import React, { useEffect, useState } from 'react';
import FullScreenContentModal from '../Modals/FullScreenContentModal';
// The VideoFile component
export default function VideoThumbnailDisplay(props) {
  const [videoStyles, setVideoStyles] = useState({})  
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  let videoLandScapeStyles = {
        width:  '320px',
        height: '180px',
        // backgroundColor:'#eae5ea'
        backgroundColor:'rgb(71 55 71)'
  }
  let videoPortraitStyles = {
        borderRadius:'5px',
        width:  '100%',
        height: '200px',
        backgroundColor:'#gb(71 55 71)'
  }   

  useEffect(()=>{
     const videoMeta = props.videoMeta
     if(!videoMeta){
        setVideoStyles(videoPortraitStyles) // these are the default styles for all
     }
     else{
        if(videoMeta.mediaDisplayType === "landscape"){
            videoPortraitStyles.width = videoMeta.width
            videoPortraitStyles.height = videoMeta.height
            setVideoStyles(videoLandScapeStyles)
        }
        else{
            videoLandScapeStyles.width = videoMeta.width
            videoLandScapeStyles.height = videoMeta.height
            setVideoStyles(videoPortraitStyles)
        }
     }
  },[props.file])

  return (
        <div
            className="owl-item"
            style={{ width: "154", marginRight: 10 }}
        >
            <div className="item" style={{marginBottom:'10px'}}>
                <div className="stream_1" style={{padding:'10px'}}>
                <video style={videoStyles} onClick={handleClickOpen}>
                        <div className='user-avatar'>{props.avatar()}</div>
                        <h5 className='video-title'>{truncateText(props.title,25)}</h5>
                        <source src={backEndUrl + props.file.url} type={props.file.mime} />
                        Sorry we are unable to show this video
                </video>
                
                {/* Render the PostModal component */}
                <div id="fullscreen-content"><FullScreenContentModal open={open} onClose={handleClose} {...props}/></div>
                </div>
            </div>
            </div>
  )
}
