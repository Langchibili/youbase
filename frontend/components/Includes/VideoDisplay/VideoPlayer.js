// "use client"
// import React, { useEffect, useRef } from "react"
// import Plyr from "plyr"
// import "plyr/dist/plyr.css"

// const VideoPlayer = ({
//     videoFormats,
//     originalVideoUrl,
//     poster,
//     title = "Video",
//     autoPlayVideo = false,
//     logView = () => {},
//     videoWrapperStyles = {width:'100%'}
// }) => {
//     const playerRef = useRef(null)

//     useEffect(() => {
//        if(typeof document !== "undefined"){
//         if (playerRef.current) {
//             const sources = videoFormats && Object.keys(videoFormats).length > 0
//                 ? Object.entries(videoFormats).map(([label, url]) => ({
//                     src: url,
//                     type: "video/mp4",
//                     size: parseInt(label.replace("p", ""), 10), // Extract resolution (e.g., 720 from "720p")
//                 }))
//                 : [
//                     {
//                         src: originalVideoUrl,
//                         type: "video/mp4",
//                         size: 720, // Default size for fallback
//                     },
//                 ]

//             const player = new Plyr(playerRef.current, {
//                 title,
//                 tooltips: { controls: true },
//                 captions: { active: true },
//                 settings: ["quality", "speed"],
//                 quality: {
//                     default: sources[0]?.size || 720,
//                     options: sources.map((source) => source.size),
//                     forced: true, // Ensure only the provided options are available
//                 },
//                 autoplay: autoPlayVideo, // Set autoplay based on the prop
//             })

//             player.source = {
//                 type: "video",
//                 title,
//                 poster,
//                 sources,
//             }

//             // Log view at 30% playback
//             const handleTimeUpdate = () => {
//                 const playedPercentage = (player.currentTime / player.duration) * 100
//                 if (playedPercentage >= 30) {
//                     logView()
//                     player.off("timeupdate", handleTimeUpdate) // Remove listener after logging
//                 }
//             }

//             player.on("timeupdate", handleTimeUpdate)

//             return () => {
//                 player.off("timeupdate", handleTimeUpdate)
//                 player.destroy()
//             }
//         }
//        }
//     }, [videoFormats, originalVideoUrl, poster])

//     return (
//         <div style={videoWrapperStyles}>
//             <video ref={playerRef} className="plyr" />
//         </div>
//     )
// }

// export default VideoPlayer

"use client";
import ViewsDisplay from "@/components/Parts/EngageMents/ViewsDisplay";
import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({
    videoFormats,
    originalVideoUrl,
    poster,
    post,
    loggedInUser,
    title = "Video",
    autoPlayVideo = false,
    videoWrapperStyles = { width: "100%" },
}) => {
    const playerRef = useRef(null);
    const [logView, setLogView] = useState(false)
    
    useEffect(() => {
        if (typeof document !== "undefined") {
            // Dynamically import Plyr only when document is available
            import("plyr").then(({ default: Plyr }) => {
                import("plyr/dist/plyr.css");

                if (playerRef.current) {
                    const sources =
                        videoFormats && Object.keys(videoFormats).length > 0
                            ? Object.entries(videoFormats).map(([label, url]) => ({
                                  src: url,
                                  type: "video/mp4",
                                  size: parseInt(label.replace("p", ""), 10), // Extract resolution (e.g., 720 from "720p")
                              }))
                            : [
                                  {
                                      src: originalVideoUrl,
                                      type: "video/mp4",
                                      size: 480, // Default size for fallback
                                  },
                              ];

                    const player = new Plyr(playerRef.current, {
                        title,
                        tooltips: { controls: true },
                        captions: { active: true },
                        settings: ["quality", "speed"],
                        quality: {
                            default: sources[1]?.size || 480,
                            options: sources.map((source) => source.size),
                            forced: true, // Ensure only the provided options are available
                        },
                        autoplay: autoPlayVideo, // Set autoplay based on the prop
                    });

                    player.source = {
                        type: "video",
                        title,
                        poster,
                        sources,
                    };

                    // Log view at 30% playback
                    const handleTimeUpdate = () => {
                        const playedPercentage =
                            (player.currentTime / player.duration) * 100;
                        if (playedPercentage >= 10) {
                            setLogView(true)
                            player.off("timeupdate", handleTimeUpdate); // Remove listener after logging
                        }
                    };

                    player.on("timeupdate", handleTimeUpdate);

                    return () => {
                        player.off("timeupdate", handleTimeUpdate);
                        player.destroy();
                    };
                }
            });
        }
    }, [videoFormats, originalVideoUrl, poster]);

    return (
        <div style={videoWrapperStyles}>
             <ViewsDisplay post={post} loggedInUser={loggedInUser} logView={logView} autoLogView={true}/>
            <video ref={playerRef} className="plyr" />
        </div>
    );
};

export default VideoPlayer;
