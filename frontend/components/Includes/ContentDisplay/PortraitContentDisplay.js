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
  return (
    <OwlCarousel margin={10} items={3} autoWidth className="owl-theme">
          {props.content.map((content) => {
            // STRUCTURING THE CONTENT
            if(!content.hasOwnProperty("attributes")){
              content.attributes = content // structure the data such that it can be read by children components
            }
            else{
              content.attributes.id = content.id // same as post.attributes.id = post.id
            }

            /***  handling the content user object ***/
            if(content.attributes.user){ // structure the data such that it can be read by children components
              if(!content.attributes.user.hasOwnProperty('data')){ // means the user account is just one straight object not embedded inside a data object, this is usually due to being the logged in user object or so
                 content.attributes.user.data = content.attributes.user
                 content.attributes.user.data.id = content.attributes.user.id
                 content.attributes.user.data.attributes = content.attributes.user.data
                 content.attributes.user.data.attributes.id = content.attributes.user.data.id
              } 
            }  
            if(!content.attributes.user || !content.attributes.user.data){ // if there is no user attached to the post, then we cannot display the post
                return null
            }
            
            /*** handling the content video type ***/
            if(content.attributes.type === "video" && content.attributes.media) {  // Ensure content has media
              if(content.attributes.media){ // structure the data such that it can be read by children components
                if(!content.attributes.media.hasOwnProperty('data')){
                    content.attributes.media.data = content.attributes.media
                }
              }
              if(content.attributes.media.data){ // now check if the data object of media is null
                return content.attributes.media.data.map((media) => {
                  if(!media.hasOwnProperty("attributes")){
                     media.attributes = media // structure the data such that it can be read by children components
                  }
                  media.attributes.id = media.id; // Ensure media.id exists
                  return (
                      <div className="item" key={media.id} style={{width:'134px'}}>
                      <div className="stream_1" style={{width:'134px',padding:'10px 0px',backgroundColor:'transparent'}}>
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
            }

            /***  handling the content image type  ***/
            if (content.attributes.type === "image" && content.attributes.featuredImages) {  // Ensure content has featuredImages if an image
              if(content.attributes.featuredImages){ // structure the data such that it can be read by children components
                 if(!content.attributes.featuredImages.hasOwnProperty('data')){
                     content.attributes.featuredImages.data = content.attributes.featuredImages
                 }
              }
              if(content.attributes.featuredImages.data){ // check if the data object is not null
                return content.attributes.featuredImages.data.map((media) => {
                  if(!media.hasOwnProperty("attributes")){
                    media.attributes = media // structure the data such that it can be read by children components
                  }
                  media.attributes.id = media.id; // Ensure media.id exists
                  return (
                    <div className="item" key={media.id} style={{width:'134px'}}>
                        <div className="stream_1" style={{width:'134px',padding:'10px 0px',backgroundColor:'transparent'}}>
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
            }
            return null; // Return null if not a video or no media
          })}
      </OwlCarousel>
  );
}


const PortraitContentSkeleton = ()=>{
  return (
    <div className="la5lo1" style={{marginBottom:'100px'}}>
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
                      
                        <div className="stream_1" style={{width:'134px',height:'200px',borderRadius:'13px'}}>
                         
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

                  