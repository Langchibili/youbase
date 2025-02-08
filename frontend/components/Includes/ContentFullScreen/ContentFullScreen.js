// "use client";

// import { useState, useEffect, useRef } from "react";
// import LikeButton from "@/components/Parts/EngageMents/LikeButton";
// import PostImpressions from "@/components/Parts/EngageMents/PostImpressions";
// import ShareButton from "@/components/Parts/EngageMents/ShareButton";
// import StreamsDisplay from "@/components/Parts/EngageMents/StreamsDisplay";
// import ViewsDisplay from "@/components/Parts/EngageMents/ViewsDisplay";
// import AvatarWithFollowButton from "@/components/Parts/UserDisplay/AvatarWithFollowButton";
// import { api_url, backEndUrl } from "@/Constants";
// import { getImage, getVideoThumbnail, truncateText } from "@/Functions";
// import { useAudio } from "@/Contexts/AudioContext";
// import VideoPlayer from "../VideoDisplay/VideoPlayer";
// import CommentsModal from "../Modals/CommentsModal";
// import PostMoreModal from "../Modals/PostMoreModal";
// import VerticalSlider from "../VerticalSlider/VerticalSlider";

// export default function ContentFullScreen(props) {
//   const { audioInstance } = useAudio();
//   const [indexOfSlider,setIndexOfSlider] = useState(0)
//   const [nextContent, setNextContent] = useState([])
//   const [page,setPage] = useState(1)

//   const constructSearchQuery = (queryTerm) => {
//       let baseFilter =  'filters[$and][0][type][$eq]=video&filters[$and][1][mediaDisplayType][$eq]=portrait' // Reels
//       if(props.post.type === "image"){
//          baseFilter = 'filters[$and][0][$and][0][type][$eq]=image&filters[$and][0][$and][1][mediaDisplayType][$not][$eq]=portrait' // Images
//       }
      
//       const terms = truncateText(queryTerm,100).split(' ') // limit the length of the search term to the first 100 characters
//       const searchFilters = terms.map((term, index) => {
//           const idx = index * 3 // Ensure unique keys for each term
//           return `filters[$and][2][$or][${idx}][title][$containsi]=${term}&filters[$and][2][$or][${idx + 1}][description][$containsi]=${term}`
//       }).join('&')
//       console.log('searchquery',`${baseFilter}&${searchFilters}&filters[$and][1][status][$eq]=published&populate=user,featuredImages,media&sort=id:desc`)
//       return `${baseFilter}&${searchFilters}&filters[$and][1][status][$eq]=published&populate=user,featuredImages,media&sort=id:desc`
//   }

//   const getContentFromTitleAndDescription = async (title, description)=>{
//     const queryTerm = title === "untitled"? description?.trim() : title?.trim() + " "+ description?.trim()
//     if(!queryTerm){
//       return [] 
//     }
//     try {
//       let queryFilters = constructSearchQuery(queryTerm)
//       const response = await fetch(`${api_url}/posts?${queryFilters}&pagination[page]=${page}&pagination[pageSize]=5`) // using custom pagination query params as specified inside the custom content type controller
//       const data = await response.json();
//       if(data.data.length <5){
//         setPage(1) // resert the page for the last content
//       }
//       return data.data || []
//     } catch (error) {
//       console.error("Failed to fetch content:", error);
//       return []
//     }finally {
//       setPage(page+1);
//     }
//   }

//   const getLastNextContent = async ()=>{
//     let queryFilters =  'filters[$and][0][type][$eq]=video&filters[$and][1][mediaDisplayType][$eq]=portrait' // Reels
//     if(props.post.type === "image"){ // captures 
//         baseFilter = 'filters[$and][0][$and][0][type][$eq]=image&filters[$and][0][$and][1][mediaDisplayType][$not][$eq]=portrait' // Images
//     }
//     try {
//       const response = await fetch(`${api_url}/posts?${queryFilters}&filters[$and][1][status][$eq]=published&populate=user,featuredImages,media&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=5`) // using custom pagination query params as specified inside the custom content type controller
//       const data = await response.json();
//       return data.data || []
//     } catch (error) {
//       console.error("Failed to fetch content:", error);
//       return []
//     }finally {
//       setPage(page+1);
//     }
//   }
//   // Add buffering event listeners
//   useEffect(() => { // pause any playing audio and remove the audio player float button
//     if(typeof document !== "undefined"){
//       const musicPlayer = document.getElementById('music-player-controller')
//       if(musicPlayer){
//         musicPlayer.style.display = "none"
//         audioInstance.audioinstance.pause()
//       }
//     }
//     const runGetNextContent = async()=>{
//       // on the first slide and the multiple of 3 slide, 3, 6, 9...
//       const contentFromTitleAndDescription = await getContentFromTitleAndDescription(props.post.title,props.post.description)
//       console.log('contentFromTitleAndDescription',contentFromTitleAndDescription)
//       if(contentFromTitleAndDescription.length < 5){
//         const lastNextContent = await getLastNextContent()
//         console.log('lastNextContent',lastNextContent)
//         setNextContent(lastNextContent)
//       }
//       else{
//         setNextContent(contentFromTitleAndDescription) // set the content obtained from the Title And Description 
//       }
//     }
//     if(indexOfSlider === 1 || indexOfSlider/3 === 0){ 
//        runGetNextContent()
//     }
//   }, [indexOfSlider]) // only rerun the code if the slider's index changes

//   useEffect(()=>{ // this is because the image full screen content don't run the other useefect due to using the videoref dependency
//     return () => {
//       if(typeof document !== "undefined"){
//         const musicPlayer = document.getElementById('music-player-controller')
//         if(musicPlayer){
//            musicPlayer.style.display = "block"
//         }
//       }
//     }
//   },[])

//   const renderContent = (props) => {
//     const user = props.post.user.data.attributes;
//     user["id"] = props.post.user.data.id;
//     const backendUrl = props.file.provider === "aws-s3"? '' : backEndUrl
   
//     return (
//       <div>
//         {/* User avatar at the top-right */}
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             right: "0",
//             padding: "10px",
//             opacity: "0.8",
//           }}
//         >
//           <div className="user-avatar" style={{ marginBottom: "5px" }}>
//             <AvatarWithFollowButton
//               userId={user.id}
//               textColor="white" 
//               shiftAvatarDisplay="right"
//               user={user}
//               loggedInUser={props.loggedInUser}
//             />
//           </div>
//         </div>

//         {/* Video container */}
//         <div
//           className="video-container"
//           style={{
//             width: window.innerWidth > 360 ? "360px" : "100%",
//             maxHeight: "100vh", // Height won't exceed the full height of the viewport
//             margin: "0 auto"
//           }}
//         >
//           {props.post.type === "video"? 
//           <>
//             <VideoPlayer autoPlayVideo={true} poster={getVideoThumbnail(props.file,props.post)} post={props.post} loggedInUser={props.loggedInUser} videoFormats={props.file.formats} originalVideoUrl={props.file.url} videoWrapperStyles = {{ width: window.innerWidth > 360 ? "360px" : "100%", margin: "0 auto", maxHeight: "100vh"}}/>
//           </>
//            : 
//                 <img 
//                     style={{
//                       width: "100%",
//                       height: "auto",
//                       maxHeight: "100%", // Ensures image doesn't exceed container's height
//                       objectFit: "cover"
//                     }}
//                      src={getImage(props.file)}/>}
//         </div>

//         {/* Post details and engagement buttons */}
//         <div
//             className="user_dt_right"
//             style={{
//               position: "fixed",
//               bottom: "0",
//               right: "0",
//               left: "0",
//               width: "100%",
//               textAlign: "center",
//             }}
//           >
//               <ul style={{ listStyleType: 'none', padding: 0 }}>
//               <li style={{display:'block',float: "left"}}>
//                 <ul
//                   style={{
//                     display: 'block',
//                     justifyContent: 'center', // Horizontally center items
//                     alignItems: 'center', // Vertically center items
//                     gap: '1rem', // Space between items
//                     padding: 0,
//                     margin: 0,
//                   }}
//                 >
//                   {props.post.type === "video" ? <ViewsDisplay inFullScreen={true}  {...props} user={user} /> : null}
//                   {props.post.type === "music" ? <StreamsDisplay inFullScreen={true}  {...props} user={user} /> : null}
//                   <LikeButton inFullScreen={true}  {...props} user={user} />
//                   <ShareButton inFullScreen={true}  {...props} user={user} />
//                   <PostImpressions {...props} user={user} />
//                 </ul>
//               </li>
//               <h5 className="video-title" style={{ zIndex: "1000", color: "lightgray", clear: "both" }}>
//                         {truncateText(props.post.title, 25)}
//               </h5>
//               <li style={{width:'100%'}}>
//               <div style={{
//                             width: "100%",
//                             margin: '0 auto',
//                             display: 'flex',
//                             justifyContent: 'space-around',
//                             alignItems: 'center',
//                             padding: '1rem 0',
//                             borderTop: '1px solid #e0e0e0', // Optional for a separator
//                         }}>
//                   <CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} userId={props.loggedInUser.user.id} />
//                   <PostMoreModal {...props} />
//                 </div>
//               </li>
//             </ul>

//          </div>
//       </div>
//     )
//   }
//   const renderNextContent = ()=>{
//      return nextContent.map((content) => {
//       // STRUCTURING THE CONTENT
//       if(!content.hasOwnProperty("attributes")){
//         content.attributes = content // structure the data such that it can be read by children components
//       }
//       else{
//         content.attributes.id = content.id // same as post.attributes.id = post.id
//       }

//       /***  handling the content user object ***/
//       if(content.attributes.user){ // structure the data such that it can be read by children components
//         if(!content.attributes.user.hasOwnProperty('data')){ // means the user account is just one straight object not embedded inside a data object, this is usually due to being the logged in user object or so
//            content.attributes.user.data = content.attributes.user
//            content.attributes.user.data.id = content.attributes.user.id
//            content.attributes.user.data.attributes = content.attributes.user.data
//            content.attributes.user.data.attributes.id = content.attributes.user.data.id
//         } 
//       }  
//       if(!content.attributes.user || !content.attributes.user.data){ // if there is no user attached to the post, then we cannot display the post
//           return []
//       }
      
//       /*** handling the content video type ***/
//       if(content.attributes.type === "video" && content.attributes.media) {  // Ensure content has media
//         if(content.attributes.media){ // structure the data such that it can be read by children components
//           if(!content.attributes.media.hasOwnProperty('data')){
//               content.attributes.media.data = content.attributes.media
//           }
//         }
//         if(content.attributes.media.data){ // now check if the data object of media is null
//             return content.attributes.media.data.map((media) => {
//             if(!media.hasOwnProperty("attributes")){
//                media.attributes = media // structure the data such that it can be read by children components
//             }
//             media.attributes.id = media.id; // Ensure media.id exists
//             return ()=> renderContent({post:content.attributes,file:media.attributes,loggedInUser:props.loggedInUser})
//          })
//        } 
//       }

//       /***  handling the content image type  ***/
//       if (content.attributes.type === "image" && content.attributes.featuredImages) {  // Ensure content has featuredImages if an image
//         if(content.attributes.featuredImages){ // structure the data such that it can be read by children components
//            if(!content.attributes.featuredImages.hasOwnProperty('data')){
//                content.attributes.featuredImages.data = content.attributes.featuredImages
//            }
//         }
//         if(content.attributes.featuredImages.data){ // check if the data object is not null
//             return content.attributes.featuredImages.data.map((media) => {
//             if(!media.hasOwnProperty("attributes")){
//               media.attributes = media // structure the data such that it can be read by children components
//             }
//             media.attributes.id = media.id; // Ensure media.id exists
//             return ()=> renderContent({post:content.attributes,file:media.attributes,loggedInUser:props.loggedInUser})
//           })
//         }
//       }
//       return null; // Return null if not a video or no media
//     })
//   }
//   console.log('renderContent',renderNextContent().flat())
//   return <VerticalSlider setIndexOfSlider={setIndexOfSlider} slides={[()=>renderContent(props),...renderNextContent().flat()]}/>
// }


"use client";

import { useState, useEffect } from "react";
import LikeButton from "@/components/Parts/EngageMents/LikeButton";
import PostImpressions from "@/components/Parts/EngageMents/PostImpressions";
import ShareButton from "@/components/Parts/EngageMents/ShareButton";
import StreamsDisplay from "@/components/Parts/EngageMents/StreamsDisplay";
import ViewsDisplay from "@/components/Parts/EngageMents/ViewsDisplay";
import AvatarWithFollowButton from "@/components/Parts/UserDisplay/AvatarWithFollowButton";
import { api_url, backEndUrl } from "@/Constants";
import { getImage, getVideoThumbnail, truncateText } from "@/Functions";
import { useAudio } from "@/Contexts/AudioContext";
import VideoPlayer from "../VideoDisplay/VideoPlayer";
import CommentsModal from "../Modals/CommentsModal";
import PostMoreModal from "../Modals/PostMoreModal";
import VerticalSlider from "../VerticalSlider/VerticalSlider";

export default function ContentFullScreen(props) {
  const { audioInstance } = useAudio();
  const [indexOfSlider, setIndexOfSlider] = useState(0);
  const [nextContent, setNextContent] = useState([]);
  const [page, setPage] = useState(1);

  // Constructs the search query string with appropriate filters.
  // Added filter to exclude the current post (props.post.id).
  const constructSearchQuery = (queryTerm) => {
    let baseFilter =
      "filters[$and][0][type][$eq]=video&filters[$and][1][mediaDisplayType][$eq]=portrait"; // Reels
    if (props.post.type === "image") {
      baseFilter =
        "filters[$and][0][$and][0][type][$eq]=image&filters[$and][0][$and][1][mediaDisplayType][$not][$eq]=portrait"; // Images
    }

    const terms = truncateText(queryTerm, 100).split(" "); // Limit search term length to 100 characters
    const searchFilters = terms
      .map((term, index) => {
        const idx = index * 3; // Ensure unique keys for each term
        return `filters[$and][2][$or][${idx}][title][$containsi]=${term}&filters[$and][2][$or][${idx + 1}][description][$containsi]=${term}`;
      })
      .join("&");

    const query = `${baseFilter}&${searchFilters}&filters[$and][1][status][$eq]=published&filters[id][$ne]=${props.post.id}&populate=user,featuredImages,media&sort=id:desc`;
    console.log("searchquery", query);
    return query;
  };

  // Fetch content based on title and description search query.
  const getContentFromTitleAndDescription = async (title, description) => {
    const queryTerm =
      title === "untitled"
        ? description?.trim()
        : title?.trim() + " " + description?.trim();
    if (!queryTerm) {
      return [];
    }
    try {
      const queryFilters = constructSearchQuery(queryTerm);
      const response = await fetch(
        `${api_url}/posts?${queryFilters}&pagination[page]=${page}&pagination[pageSize]=5`
      ); // Using custom pagination query params as specified in the content type controller
      const data = await response.json();
      if (data.data.length < 5) {
        setPage(1); // Reset the page if fewer than 5 posts are returned
      }
      return data.data || [];
    } catch (error) {
      console.error("Failed to fetch content:", error);
      return [];
    } finally {
      setPage(page + 1);
    }
  };

  // Fetch the latest content using a default query.
  // Fixed: Corrected variable usage and added filter to exclude the current post.
  const getLastNextContent = async () => {
    let queryFilters =
      "filters[$and][0][type][$eq]=video&filters[$and][1][mediaDisplayType][$eq]=portrait"; // Reels
    if (props.post.type === "image") {
      queryFilters =
        "filters[$and][0][$and][0][type][$eq]=image&filters[$and][0][$and][1][mediaDisplayType][$not][$eq]=portrait"; // Images
    }
    try {
      const response = await fetch(
        `${api_url}/posts?${queryFilters}&filters[$and][1][status][$eq]=published&filters[id][$ne]=${props.post.id}&populate=user,featuredImages,media&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=5`
      );
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Failed to fetch content:", error);
      return [];
    } finally {
      setPage(page + 1);
    }
  };

  // Effect to pause audio and hide the music player,
  // and fetch next content when the slider index changes.
  useEffect(() => {
    if (typeof document !== "undefined") {
      const musicPlayer = document.getElementById("music-player-controller");
      if (musicPlayer) {
        musicPlayer.style.display = "none";
        audioInstance.audioinstance.pause();
      }
    }
    const runGetNextContent = async () => {
      // On the first slide (index 0) and every multiple of 3 slides (0, 3, 6, 9, ...)
      if (indexOfSlider % 3 === 0) {
        const contentFromTitleAndDescription = await getContentFromTitleAndDescription(
          props.post.title,
          props.post.description
        );
        console.log("contentFromTitleAndDescription", contentFromTitleAndDescription);
        if (contentFromTitleAndDescription.length < 5) {
          const lastNextContent = await getLastNextContent();
          console.log("lastNextContent", lastNextContent);
          setNextContent((prevContent) => [...prevContent, ...lastNextContent]);
        } else {
          // Concatenate the new content to the existing state.
          setNextContent((prevContent) => [
            ...prevContent,
            ...contentFromTitleAndDescription,
          ]);
        }
      }
    };
    runGetNextContent();

    return () => {
      if (typeof document !== "undefined") {
        const musicPlayer = document.getElementById("music-player-controller");
        if (musicPlayer) {
          musicPlayer.style.display = "block";
        }
      }
    }
  }, [indexOfSlider]); // Rerun when the slider index changes

  // Cleanup effect to show the music player when this component unmounts.
 
  const renderContent = (props) => {
    const user = props.post.user.data.attributes;
    user["id"] = props.post.user.data.id;
    const backendUrl = props.file.provider === "aws-s3"? '' : backEndUrl
   
    return (
      <div>
        {/* User avatar at the top-right */}
        <div
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            padding: "10px",
            opacity: "0.8",
          }}
        >
          <div className="user-avatar" style={{ marginBottom: "5px" }}>
            <AvatarWithFollowButton
              userId={user.id}
              textColor="white" 
              shiftAvatarDisplay="right"
              user={user}
              loggedInUser={props.loggedInUser}
            />
          </div>
        </div>

        {/* Video container */}
        <div
          className="video-container"
          style={{
            width: window.innerWidth > 360 ? "360px" : "100%",
            maxHeight: "100vh", // Height won't exceed the full height of the viewport
            margin: "0 auto"
          }}
        >
          {props.post.type === "video"? 
          <>
            <VideoPlayer autoPlayVideo={true} poster={getVideoThumbnail(props.file,props.post)} post={props.post} loggedInUser={props.loggedInUser} videoFormats={props.file.formats} originalVideoUrl={props.file.url} videoWrapperStyles = {{ width: window.innerWidth > 360 ? "360px" : "100%", margin: "0 auto", maxHeight: "100vh"}}/>
          </>
           : 
                <img 
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "100%", // Ensures image doesn't exceed container's height
                      objectFit: "cover"
                    }}
                     src={getImage(props.file)}/>}
        </div>

        {/* Post details and engagement buttons */}
        <div
            className="user_dt_right"
            style={{
              position: "fixed",
              bottom: "0",
              right: "0",
              left: "0",
              width: "100%",
              textAlign: "center",
            }}
          >
              <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{display:'block',float: "left"}}>
                <ul
                  style={{
                    display: 'block',
                    justifyContent: 'center', // Horizontally center items
                    alignItems: 'center', // Vertically center items
                    gap: '1rem', // Space between items
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {props.post.type === "video" ? <ViewsDisplay inFullScreen={true}  {...props} user={user} /> : null}
                  {props.post.type === "music" ? <StreamsDisplay inFullScreen={true}  {...props} user={user} /> : null}
                  <LikeButton inFullScreen={true}  {...props} user={user} />
                  <ShareButton inFullScreen={true}  {...props} user={user} />
                  <PostImpressions {...props} user={user} />
                </ul>
              </li>
              <h5 className="video-title" style={{ zIndex: "1000", color: "lightgray", clear: "both" }}>
                        {truncateText(props.post.title, 25)}
              </h5>
              <li style={{width:'100%'}}>
              <div style={{
                            width: "100%",
                            margin: '0 auto',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            padding: '1rem 0',
                            borderTop: '1px solid #e0e0e0', // Optional for a separator
                        }}>
                  <CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} userId={props.loggedInUser.user.id} />
                  <PostMoreModal {...props} />
                </div>
              </li>
            </ul>

         </div>
      </div>
    )
  }

  // Process the fetched next content and structure it for the slider.
  // Added a check to exclude the current post (props.post.id).
  const renderNextContent = () => {
    return nextContent.map((content) => {
      // Exclude the current post from being included
      if (content.id === props.post.id) {
        return [];
      }

      // STRUCTURING THE CONTENT
      if (!content.hasOwnProperty("attributes")) {
        content.attributes = content; // Structure the data for child components
      } else {
        content.attributes.id = content.id; // Ensure post.attributes.id exists
      }

      /*** Handling the content user object ***/
      if (content.attributes.user) {
        // Structure the data for child components if user data is not embedded
        if (!content.attributes.user.hasOwnProperty("data")) {
          content.attributes.user.data = content.attributes.user;
          content.attributes.user.data.id = content.attributes.user.id;
          content.attributes.user.data.attributes = content.attributes.user.data;
          content.attributes.user.data.attributes.id = content.attributes.user.data.id;
        }
      }
      // Skip content if no user data is attached
      if (!content.attributes.user || !content.attributes.user.data) {
        return [];
      }

      /*** Handling the content video type ***/
      if (content.attributes.type === "video" && content.attributes.media) {
        // Structure media data for child components
        if (content.attributes.media && !content.attributes.media.hasOwnProperty("data")) {
          content.attributes.media.data = content.attributes.media;
        }
        if (content.attributes.media.data) {
          return content.attributes.media.data.map((media) => {
            if (!media.hasOwnProperty("attributes")) {
              media.attributes = media;
            }
            media.attributes.id = media.id; // Ensure media.id exists
            return () =>
              renderContent({
                post: content.attributes,
                file: media.attributes,
                loggedInUser: props.loggedInUser,
              });
          });
        }
      }

      /*** Handling the content image type ***/
      if (
        content.attributes.type === "image" &&
        content.attributes.featuredImages
      ) {
        // Structure featuredImages data for child components
        if (
          content.attributes.featuredImages &&
          !content.attributes.featuredImages.hasOwnProperty("data")
        ) {
          content.attributes.featuredImages.data = content.attributes.featuredImages;
        }
        if (content.attributes.featuredImages.data) {
          return content.attributes.featuredImages.data.map((media) => {
            if (!media.hasOwnProperty("attributes")) {
              media.attributes = media;
            }
            media.attributes.id = media.id; // Ensure media.id exists
            return () =>
              renderContent({
                post: content.attributes,
                file: media.attributes,
                loggedInUser: props.loggedInUser,
              });
          });
        }
      }
      return []; // Return an empty array if content is neither video nor image
    });
  };

  console.log("renderContent", renderNextContent().flat());

  // Combine the main content and the next content into one flat array for the VerticalSlider.
  return (
    <VerticalSlider
      setIndexOfSlider={setIndexOfSlider}
      slides={[() => renderContent(props), ...renderNextContent().flat()]}
    />
  );
}
