'use client'

import { backEndUrl } from '@/Constants';
import { getVideoThumbnail, truncateText } from '@/Functions';
import React, { useEffect, useState } from 'react';
import FullScreenContentModal from '../Modals/FullScreenContentModal';
import AvatarOnly from '@/components/Parts/UserDisplay/AvatarOnly';
import PostMoreBtn from '../PostMoreBtn/PostMoreBtn';
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
  const backendUrl = props.file.provider === "aws-s3"? '' : backEndUrl
  console.log('in the thumbnails page',props)
  return (
        <>
         <div style={{ 
              minHeight:'200px', 
              position: "relative", 
              display: "inline-block", 
              backgroundSize:'cover',
              backgroundPosition: 'center',
              backgroundRepeat:'no-repeat',
              borderRadius: '13px',
              padding:'5px',
              width:'100%',
              backgroundImage:"url("+getVideoThumbnail(props.file, props.post)+")" }}
              onClick={handleClickOpen} 
              >
          {/* Avatar in the top-left corner */}
          <AvatarOnly 
            userId={props.post.user.data.id} 
            custom_styles={{
              width:'30px',
              borderRadius: '50%',
              height:'29px'
            }}
          />

          {/* PostMoreBtn in the top-right corner */}
          <PostMoreBtn  
            action="edit" 
            {...props}
            thisIsMyPost={props.loggedInUser.user.id === props.post.user.data.id} 
            postId={props.post.id} 
            moreStyles={{
              position:'absolute',
              marginTop: '5px',
              top: 0,
              right: 0,
              color:'white',
              zIndex: "1000",
            }}
          />
          {/* clickable field or area */}
         {/* <div style={{Height:'80%',width:"100%"}}></div> */}
          {/* Video title in the bottom-left corner */}
          <h5 
            className="video-title" 
            style={{
              position: "absolute",
              bottom: "5px",
              left: "5px",
              color: "white",
              zIndex: "1000",
              margin: 0,
              padding: "0",
            }}
          >
            {truncateText(props.post.title, 25)}
          </h5>

          {/* FullScreenContentModal */}
        </div>
        <div id="fullscreen-content">
            <FullScreenContentModal open={open} onClose={handleClose} {...props} />
          </div>
        </>
  )
}


 // <div>
            //     {/* <video style={videoStyles} onClick={handleClickOpen}>
            //             <div className='user-avatar'>{props.avatar()}</div>
            //             <h5 className='video-title'>{truncateText(props.title,25)}</h5>
            //             <source src={backendUrl + props.file.url} type={props.file.mime} />
            //             Sorry we are unable to show this video
            //     </video> */}
            //     <AvatarOnly userId={props.post.user.data.id}/>
            //     <PostMoreBtn action="edit" thisIsMyPost={props.loggedInUser.user.id === props.post.user.data.id} postId={props.post.id}/>
            //     <img style={videoStyles}  onClick={handleClickOpen} src={getVideoThumbnail(props.file,props.post)}/>
            //     {/* Render the PostModal component */}
            //     <div id="fullscreen-content"><FullScreenContentModal open={open} onClose={handleClose} {...props}/></div>
            //     <h5 className="video-title" style={{ zIndex: "1000", color: "lightgray", clear: "both" }}>
            //     {truncateText(props.post.title, 25)}
            //     </h5>
            // </div>