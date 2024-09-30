// import { backEndUrl, log } from '@/Constants';
// import React, { useState, useEffect } from 'react';

// // Helper function to format the duration
// const formatDuration = (duration) => {
//   const minutes = Math.floor(duration / 60)
//   const seconds = Math.floor(duration % 60)
//   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
// };

// // The VideoFile component
// export default function VideoFileDisplay({ file, handleRemoveMedia, videoMeta, hideRemoveButton }) {
//   const [videoDuration, setVideoDuration] = useState(null);
//   const [videoFile, setVideoFile] = useState(null)
//   let videoRef = React.createRef();

//   // Calculate duration once the component mounts
//   useEffect(() => {
//     if(!file.attributes){
//        setVideoFile(file)
//     }
//     else{
//        setVideoFile(file.attributes)
//     }
//     const videoElement = videoRef.current;
//     log(backEndUrl + videoFile);
//     if (videoElement) {
//       videoElement.addEventListener('loadedmetadata', () => {
//         setVideoDuration(videoElement.duration);
//       });

//       return () => {
//         videoElement.removeEventListener('loadedmetadata', () => {
//           setVideoDuration(videoElement.duration);
//         });
//       };
//     }
//   }, []);
//   const VideoDisplay = ()=>{
//     if(!videoMeta){
//         return "flex"
//     }
//     if(!videoMeta.mediaDisplayType){
//         return "flex"
//     }
//     else{
//         if(videoMeta.mediaDisplayType === "landscape"){
//            return "block"
//         }
//         else{
//             return "flex"
//         }
//     }
    
//   }
//   if(!videoFile){
//     return
//   }
//   const renderVideoCarousel = (videos, videoRef)=>{
//     console.log('vdeos here',videos)
//     if(!hideRemoveButton){
//       const video = videos
//       return ( // single video though written as videos
//         <div>
//             <video ref={videoRef} controls style={{ maxWidth: '280px', maxHeight: '180px' }}>
//                 <source src={backEndUrl + video.url} type={video.mime} />
//                 Sorry we are unable to show this video
//             </video>
//         </div>
//       )
//     }
//     if(videos.data.length === 1){
//       const video = videos.data[0].attributes
//       console.log('the vid',video)
//       return (<div style={{width: "100%"}}>
//                 <video ref={videoRef} controls style={{ borderRadius: "5px", width: "100%", maxHeight:"500px" }}>
//                     <source src={backEndUrl + video.url} type={video.mime} />
//                     Sorry we are unable to show this video
//                 </video>
//             </div>)
//     }
//     console.log('reaching here')
//     videos.data.map((video,index)=>{
//       console.log('why is this not returning the carousel of videos regardless of the code reaching here', video)
//          return (
//           <div className="la5lo1">
//           <div className="owl-carousel featured_courses owl-theme owl-loaded owl-drag">
//             <div className="owl-stage-outer">
//               <div>
//                 {index === 0? <div className="owl-item active" style={{ width: 314, marginRight: 20 }}>
//                   <div className="item">
//                     <div className="fcrse_1 mb-20">
//                       <video ref={videoRef} controls style={{ borderRadius: "5px", width: "100%", maxHeight:"500px" }}>
//                           <source src={backEndUrl + video.attributes.url} type={video.attributes.mime} />
//                           Sorry we are unable to show this video
//                       </video>
//                     </div>
//                   </div>
//                 </div> : <div className="owl-item" style={{ width: 314, marginRight: 20 }}>
//                   <div className="item">
//                     <div className="fcrse_1 mb-20">
//                     <div style={{width: "100%"}}>
//                       <video ref={videoRef} controls style={{ borderRadius: "5px", width: "100%", maxHeight:"500px" }}>
//                           <source src={backEndUrl + video.attributes.url} type={video.attributes.mime} />
//                           Sorry we are unable to show this video
//                       </video>
//                      </div>
//                     </div>
//                   </div>
//                 </div>}
                
//               </div>
//             </div>
//             <div className="owl-nav">
//               <button type="button" role="presentation" className="owl-prev disabled">
//                 <i className="uil uil-angle-left" />
//               </button>
//               <button type="button" role="presentation" className="owl-next">
//                 <i className="uil uil-angle-right" />
//               </button>
//             </div>
//             <div className="owl-dots disabled" />
//             <div className="owl-nav">
//               <button type="button" role="presentation" className="owl-prev disabled">
//                 <i className="uil uil-angle-left" />
//               </button>
//               <button type="button" role="presentation" className="owl-next">
//                 <i className="uil uil-angle-right" />
//               </button>
//             </div>
//             <div className="owl-dots disabled" />
//           </div>
//         </div>
//          )
//     })
   
//   }
  
//   console.log(videoFile,'the vid here')
//   return (
//     <div id={"#media-" + file.id} style={{width:'100%', marginTop: '2px', padding: hideRemoveButton? "none" : "10px", borderBottom: "1px solid ghostwhite"}}>
//         <div  style={{ display: VideoDisplay(), alignItems: 'center', marginBottom: '10px' }}>
//            {hideRemoveButton? <></> : <div style={{ flexGrow: 1, paddingRight:'5px', marginBottom:'5px' }}>
//                 <p><strong>File Name:</strong> {videoFile.name}</p>
//                 <p><strong>Duration:</strong> {videoDuration ? formatDuration(videoDuration) : 'Loading...'}</p>
//             </div>}
//             {renderVideoCarousel(videoFile,videoRef)}
//         </div>
//         {hideRemoveButton? <></> : <button
//         onClick={() => handleRemoveMedia(file.id)}
//         style={{
//             backgroundColor: 'red',
//             color: 'white',
//             border: 'none',
//             padding: '5px 10px',
//             cursor: 'pointer'
//         }}
//     >
//         Remove
//        </button>}
//     </div>
//   )
// }


import { backEndUrl, log } from '@/Constants';
import { getPostMedia } from '@/Functions';
import React, { useState, useEffect } from 'react';

// Helper function to format the duration
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// The VideoFileDisplay component
export default function VideoFileDisplay({ file, handleRemoveMedia, videoMeta, hideRemoveButton, getMedia, postTitle }) {
  const [videoDuration, setVideoDuration] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  // const [videoMeta, setVideoMeta] = useState(null)
  const videoRef = React.createRef();

  // Calculate duration once the component mounts
  useEffect(() => {
    if(getMedia){
        const runGetMedia = async()=>{
          const media = await getPostMedia(postTitle)
          console.log({data:media})
          setVideoFile({data:media})
          console.log(media)
        }
        runGetMedia()
    }
    else{
      if (!file?.attributes) {
        setVideoFile(file);
      } else {
        setVideoFile(file.attributes);
      }
    }

    const videoElement = videoRef.current;
    if (videoFile && videoElement) {
      videoElement.addEventListener('loadedmetadata', () => {
        setVideoDuration(videoElement.duration);
      });

      return () => {
        videoElement.removeEventListener('loadedmetadata', () => {
          setVideoDuration(videoElement.duration);
        });
      };
    }
  }, [file]);

  // Determine the video display style
  const VideoDisplay = () => {
    if (!videoMeta || !videoMeta.mediaDisplayType) {
      return 'flex';
    }
    return videoMeta.mediaDisplayType === 'landscape' ? 'block' : 'flex';
  };

  // Function to render the video carousel
  const renderVideoCarousel = (videos, videoRef) => {
    if (!hideRemoveButton) {
      return (
        <div>
          <video ref={videoRef} controls style={{ maxWidth: '280px', maxHeight: '180px' }}>
            <source src={backEndUrl + videos.url} type={videos.mime} />
            Sorry, we are unable to show this video.
          </video>
        </div>
      );
    }
    if(!videos.data) {
      return null
    }
    if (videos.data.length === 1) {
      const video = videos.data[0].attributes;
      return (
        <div style={{ width: '100%' }}>
          <video ref={videoRef} controls style={{ borderRadius: '5px', width: '100%', maxHeight: '500px' }}>
            <source src={backEndUrl + video.url} type={video.mime} />
            Sorry, we are unable to show this video.
          </video>
        </div>
      );
    }

    return (
      <div className="owl-carousel featured_courses owl-theme owl-loaded owl-drag">
        <div className="owl-stage-outer">
          <div className="owl-stage" style={{transform: "translate3d(0px, 0px, 0px)", transition: "all", width: "2331px"}}>
            {videos.data.map((video, index) => {
              const videoData = video.attributes;
              return (
                <div
                  key={index}
                  className={`owl-item ${index === 0 ? 'active' : ''}`}
                  style={{ width: "100%", marginRight: 20 }}
                >
                  <div className="item">
                    <div className="fcrse_1 mb-20">
                      <video ref={videoRef} controls style={{ borderRadius: '5px', width: '100%', maxHeight: '500px' }}>
                        <source src={backEndUrl + videoData.url} type={videoData.mime} />
                        Sorry, we are unable to show this video.
                      </video>
                      <small>{index+1}</small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="owl-nav">
          <button type="button" className="owl-prev">
            <i className="uil uil-angle-left" />
          </button>
          <button type="button" className="owl-next">
            <i className="uil uil-angle-right" />
          </button>
        </div>
      </div>
    );
  };

  
  // If no video file, return null
  if (!videoFile) return null;

  return (
    <div
      id={!hideRemoveButton?"#media-" + file.id : ""}
      style={{
        width: '100%',
        marginTop: '2px',
        padding: hideRemoveButton ? 'none' : '10px',
        borderBottom: '1px solid ghostwhite',
      }}
    >
      <div style={{ display: VideoDisplay(), alignItems: 'center', marginBottom: '10px' }}>
        {!hideRemoveButton && (
          <div style={{ flexGrow: 1, paddingRight: '5px', marginBottom: '5px' }}>
            <p><strong>File Name:</strong> {videoFile.name}</p>
            <p><strong>Duration:</strong> {videoDuration ? formatDuration(videoDuration) : 'Loading...'}</p>
          </div>
        )}
        {renderVideoCarousel(videoFile, videoRef)}
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
