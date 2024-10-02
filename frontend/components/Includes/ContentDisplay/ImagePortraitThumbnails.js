import { backEndUrl } from '@/Constants'
import { getImage, truncateText } from '@/Functions'
import React, { useEffect, useState } from 'react'
import FullScreenContentModal from '../Modals/FullScreenContentModal'

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
    <div
      className="owl-item"
      style={{ width: '134.017px', marginRight: 10 }}
    >
      <div className="item" style={{marginBottom:'10px'}}>
        <div className="stream_1" style={{padding:'10px'}}>
          {/* Image element */}
          <img
            style={imageStyles}
            src={getImage(props.file)}
            alt={truncateText(props.title,25)}
            onClick={handleClickOpen}
          />
          <div className='user-avatar'>{props.avatar()}</div>
          <h5 className='image-title'>{truncateText(props.title, 25)}</h5>

          {/* Render the FullScreenContentModal component */}
          <div id="fullscreen-content">
            <FullScreenContentModal open={open} onClose={handleClose} {...props} />
          </div>
        </div>
      </div>
    </div>
  )
}
