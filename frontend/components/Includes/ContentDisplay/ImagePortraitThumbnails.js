'use client'


import { getImage, truncateText } from '@/Functions'
import React, { useEffect, useState } from 'react'
import FullScreenContentModal from '../Modals/FullScreenContentModal'
import AvatarOnly from '@/components/Parts/UserDisplay/AvatarOnly'
import PostMoreBtn from '../PostMoreBtn/PostMoreBtn'

// The ImagePortraitThumbnails component
export default function ImagePortraitThumbnails(props) {
  const [imageStyles, setImageStyles] = useState({})  
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (e) => {
    setOpen(false)
  }

  // Define default styles for landscape and portrait images
  let imageLandScapeStyles = {
    width:  '320px',
    height: '180px',
    backgroundColor: '#eae5ea',
    objectFit: 'cover',
  }
  let imagePortraitStyles = {
    width:  '115px',
    height: '200px',
    backgroundColor: '#eae5ea',
    objectFit: 'cover',
  }

  useEffect(() => {
    const imageMeta = props.imageMeta
    if (!imageMeta) {
      setImageStyles(imagePortraitStyles) // default to portrait style
    } else {
      if (imageMeta.mediaDisplayType === 'landscape') {
        // Apply landscape dimensions if available
        imagePortraitStyles.width = imageMeta.width || imagePortraitStyles.width
        imagePortraitStyles.height = imageMeta.height || imagePortraitStyles.height
        setImageStyles(imageLandScapeStyles)
      } else {
        // Apply portrait dimensions if available
        imageLandScapeStyles.width = imageMeta.width || imageLandScapeStyles.width
        imageLandScapeStyles.height = imageMeta.height || imageLandScapeStyles.height
        setImageStyles(imagePortraitStyles)
      }
    }
  }, [props.file])


return (
         <>
         <div style={{ 
              minHeight:'200px', 
              position: "relative", 
              display: "inline-block", 
              backgroundSize:'cover',
              backgroundPosition:'center',
              backgroundRepeat:'no-repeat',
              width:'100%',
              borderRadius:'13px',
              backgroundImage:"url("+getImage(props.file,"small")+")" }}
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
              top: 0,
              right: 0,
              color:'white',
            }}
          />

          {/* Video title in the bottom-left corner */}
          <h5 
            className="video-title" 
            style={{
              position: "absolute",
              bottom: "5px",
              left: "5px",
              color: "white",
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


  // return (
  //         <>
  //         {/* Image element */}
  //         <img
  //           style={imageStyles}
  //           src={getImage(props.file,"small")}
  //           alt={truncateText(props.title,25)}
  //           onClick={handleClickOpen}
  //         />
  //         <div className='user-avatar'>{props.avatar()}</div>
  //         <h5 className='image-title'>{truncateText(props.title, 25)}</h5>

  //         {/* Render the FullScreenContentModal component */}
  //         <div id="fullscreen-content">
  //           <FullScreenContentModal open={open} onClose={handleClose} {...props} />
  //         </div>
  //       </>
  // )
