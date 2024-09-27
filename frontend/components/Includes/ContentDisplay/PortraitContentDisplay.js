"use client"

import VideoThumbnailDisplay from '../VideoDisplay/VideoThumbnailDisplay';
import AvatarOnly from '@/components/Parts/UserDisplay/AvatarOnly';
import ImagePortraitThumbnails from './ImagePortraitThumbnails';
import { log } from '@/Constants';

export default function PortraitContentDisplay(props) {
  console.log('portrait vids', props.content); // Make sure content is not empty

  if (!props.content || props.content.length === 0) return <></>; // Check for undefined or empty content
  
  return (
    <>
      <div className="la5lo1" style={{marginBottom:'10px'}}>
       <div className="owl-carousel Student_says owl-theme owl-loaded owl-drag">
        <div className="owl-stage-outer">
        <div
            className="owl-stage"
            style={{
            transform: "translate3d(-144px, 0px, 0px)",
            transition: "all",
            width: "1297px"
            }}
            
        >
          {props.content.map((content) => {
            content.attributes.id = content.id
            if (content.attributes.type === "video" && content.attributes.media) {  // Ensure content has media
                return content.attributes.media.data.map((media) => {
                    media.attributes.id = media.id; // Ensure media.id exists
                    return (
                        <VideoThumbnailDisplay
                            key={media.id}
                            title={content.attributes.title}
                            file={media.attributes}
                            post={content.attributes}
                            loggedInUser={props.loggedInUser}
                            avatar={()=>{<AvatarOnly userId={content.attributes.user.data.id} />}}
                        />
                    )
              })
            }
            if (content.attributes.type === "image" && content.attributes.featuredImages ) {  // Ensure content has media
              return content.attributes.featuredImages.data.map((media) => {
                  media.attributes.id = media.id; // Ensure media.id exists
                  return (
                      <ImagePortraitThumbnails
                          key={media.id}
                          title={content.attributes.title}
                          file={media.attributes}
                          post={content.attributes}
                          loggedInUser={props.loggedInUser}
                          avatar={()=>{<AvatarOnly userId={content.attributes.user.data.id} />}}
                      />
                  )
            })
          }
            return null; // Return null if not a video or no media
          })}

        </div>
       </div>
       <div className="owl-nav">
      <button type="button" role="presentation" className="owl-prev disabled">
        <i className="uil uil-angle-left" />
      </button>
      <button type="button" role="presentation" className="owl-next">
        <i className="uil uil-angle-right" />
      </button>
    </div>
    <div className="owl-dots disabled"></div>
      </div>
     </div>
    </>
  );
}
