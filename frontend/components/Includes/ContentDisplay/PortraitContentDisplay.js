"use client"

import VideoThumbnailDisplay from '../VideoDisplay/VideoThumbnailDisplay';
import AvatarOnly from '@/components/Parts/UserDisplay/AvatarOnly';
import ImagePortraitThumbnails from './ImagePortraitThumbnails';
import { useEffect, useState } from 'react';



export default function PortraitContentDisplay(props) {
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
  }, [document])

  if (!OwlCarousel) {
    return <PortraitContentSkeleton/> // loading carousel
  }
  if (!props.content || props.content.length === 0) return <></>; // Check for undefined or empty content
  console.log(props.content)
  return (
    <OwlCarousel margin={10} items={3} autoWidth className="owl-theme">
          {props.content.map((content) => {
            content.attributes.id = content.id // same as post.attributes.id = post.id
            if (content.attributes.type === "video" && content.attributes.media) {  // Ensure content has media
             
              return content.attributes.media.data.map((media) => {
                    media.attributes.id = media.id; // Ensure media.id exists
                    return (
                     
                      <div className="item" key={media.id} style={{width:'134px'}}>
                        <div className="stream_1" style={{width:'134px',padding:'10px'}}>
                          <VideoThumbnailDisplay
                             
                              title={content.attributes.title}
                              file={media.attributes}
                              post={content.attributes}
                              loggedInUser={props.loggedInUser}
                              avatar={()=>{<AvatarOnly userId={content.attributes.user.data.id} />}}
                          />
                           </div>
                          </div>
                    )
              })
            }
            if (content.attributes.type === "image" && content.attributes.featuredImages ) {  // Ensure content has media
            
              return content.attributes.featuredImages.data.map((media) => {
                  media.attributes.id = media.id; // Ensure media.id exists
                  return (
                    <div className="item" key={media.id} style={{width:'134px'}}>
                        <div className="stream_1" style={{width:'134px',padding:'10px'}}>
                          <ImagePortraitThumbnails
                              key={media.id}
                              title={content.attributes.title}
                              file={media.attributes}
                              post={content.attributes}
                              loggedInUser={props.loggedInUser}
                              avatar={()=>{<AvatarOnly userId={content.attributes.user.data.id} />}}
                          />
                          </div>
                        </div>
                  )
            })
          }
            return null; // Return null if not a video or no media
          })}
      </OwlCarousel>
  );
}

const PortraitContentSkeleton = ()=>{
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
                    <div className="owl-item active" key={index} style={{width:'134px',height:'200px',marginRight:'10px'}}>
                      
                        <div className="stream_1" style={{width:'134px',padding:'10px',height:'200px'}}>
                         
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

                  