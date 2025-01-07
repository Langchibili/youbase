"use client";

import { useState, useEffect, useRef } from "react";
import LikeButton from "@/components/Parts/EngageMents/LikeButton";
import PostImpressions from "@/components/Parts/EngageMents/PostImpressions";
import ShareButton from "@/components/Parts/EngageMents/ShareButton";
import StreamsDisplay from "@/components/Parts/EngageMents/StreamsDisplay";
import ViewsDisplay from "@/components/Parts/EngageMents/ViewsDisplay";
import ContentLoader from "../Loader/ContentLoader";
import AvatarWithFollowButton from "@/components/Parts/UserDisplay/AvatarWithFollowButton";
import { backEndUrl } from "@/Constants";
import { getImage, getVideoThumbnail, truncateText } from "@/Functions";
import { useAudio } from "@/Contexts/AudioContext";
import VideoPlayer from "../VideoDisplay/VideoPlayer";
import CommentsModal from "../Modals/CommentsModal";
import PostMoreModal from "../Modals/PostMoreModal";

export default function ContentFullScreen(props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [logViewHandler, setLogViewHandler] = useState(null)
  const [logView, setLogView] = useState(false)
  const { audioInstance } = useAudio();
  
  console.log('the video file',props)
  // Handle video play/pause toggle on tap
  const handleVideoClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Add buffering event listeners
  useEffect(() => {
    if(typeof document !== "undefined"){
      const musicPlayer = document.getElementById('music-player-controller')
      if(musicPlayer){
        musicPlayer.style.display = "none"
        audioInstance.audioinstance.pause()
      }
    }
    return
    if(props.post.type !== "video"){
      return
    }
    const video = videoRef.current;

    videoRef.current.ontimeupdate = (e)=>{
      setCurrentTime(e.target.currentTime)
      const progress = (e.target.currentTime / e.target.duration) * 100;
      // Show alert at 20% and clear interval
      if (progress >= 30) {
          setLogView(true)
      }
    }

    const handleBuffering = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);

    video.addEventListener("waiting", handleBuffering); // When video starts buffering
    video.addEventListener("playing", handlePlaying);  // When video resumes playing

    return () => {
      video.removeEventListener("waiting", handleBuffering);
      video.removeEventListener("playing", handlePlaying);
      if(typeof document !== "undefined"){
        const musicPlayer = document.getElementById('music-player-controller')
        if(musicPlayer){
           musicPlayer.style.display = "block"
        }
      }
    };
  }, [videoRef.current]);

  useEffect(()=>{ // this is because the image full screen content don't run the other useefect due to using the videoref dependency
    return () => {
      if(typeof document !== "undefined"){
        const musicPlayer = document.getElementById('music-player-controller')
        if(musicPlayer){
           musicPlayer.style.display = "block"
        }
      }
    }
  },[])

  const renderContent = () => {
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
          {/*<video
            ref={videoRef}
            onClick={handleVideoClick}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "100%", // Ensures video doesn't exceed container's height
              objectFit: "cover"
            }}
            autoPlay
            controls={false}
          >
            <source src={backendUrl + props.file.url} type={props.file.mime} />
            Sorry, we are unable to show this video.
          </video>*/}
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

          {/* Loader while buffering */}
          {isBuffering && (
            <div className="buffer-loader" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <ContentLoader />
            </div>
          )}

          {/* Play button overlay when paused */}
          {!isPlaying && (
            <div
              className="play-button-overlay"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                color: "white",
              }}
            >
              ▶️
            </div>
          )}

          {/* Progress loader below the video */}
          <div
            className="video-progress-loader"
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              height: "5px",
              backgroundColor: "lightgray",
            }}
          >
            {/* This can be dynamically updated based on video progress */}
            <div
              style={{
                width: "30%", // This width can be bound to the video progress
                height: "100%",
                backgroundColor: "blue",
              }}
            ></div>
          </div>
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
          
          {/* <ul>
              <li>
                <ul>
                  <ViewsDisplay post={props.post} loggedInUser={props.loggedInUser} logView={logView} autoLogView={true}/>
                  {props.post.type === "video" ? <ViewsDisplay {...props} user={user} /> : null}
                  {props.post.type === "music" ? <StreamsDisplay {...props} user={user} /> : null}
                  <LikeButton {...props} user={user} />
                  <ShareButton {...props} user={user} />
                  <PostImpressions {...props} user={user} />
                </ul>
              </li>
              <br/>
              <li>
                <div style={{
                      width: "100%",
                      margin: '0 auto',
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      padding: '1rem 0',
                      borderTop: '1px solid #e0e0e0', // Optional for a separator
                  }}>
                    <CommentsModal loggedInUser={props.loggedInUser} post={props.post} postId={props.post.id} userId={props.loggedInUser.user.id}/>
                    <PostMoreModal {...props}/>
                </div>
              </li>
          </ul> */}
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
      <ViewsDisplay inFullScreen={true} post={props.post} loggedInUser={props.loggedInUser} logView={logView} autoLogView={true} />
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
    );
  };

  return <>{renderContent()}</>;
}
