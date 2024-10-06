'use client';

import ViewsDisplay from '@/components/Parts/EngageMents/ViewsDisplay';
import { backEndUrl, log } from '@/Constants';
import { getPostMedia } from '@/Functions';
import React, { useState, useEffect, useRef } from 'react';

// Helper function to format the duration
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function VideoFileDisplay({ file, post, loggedInUser, handleRemoveMedia, videoMeta, hideRemoveButton, getMedia, postTitle }) {
  const [videoDurations, setVideoDurations] = useState({}); // Object to store durations per video
  const [currentTime, setCurrentTime] = useState({});
  const [videoFile, setVideoFile] = useState(null);
  const videoRefs = useRef([]); // Array to store refs for multiple video elements
  const [logView, setLogView] = useState(false)

  useEffect(() => {
    if(getMedia){
      const runGetMedia = async()=> {
        const media = await getPostMedia(postTitle);
        setVideoFile({ data: media });
        console.log(media);
      }
      runGetMedia();
    } else {
      setVideoFile(file?.attributes ? file.attributes : file);
    }
  }, [file, getMedia]);

  useEffect(() => {
    if (videoFile && videoFile.data && videoFile.data.length) {
      videoFile.data.forEach((video, index) => {
        const videoElement = videoRefs.current[index];
        if (videoElement) {
          videoElement.onloadedmetadata = () => {
            setVideoDurations((prevDurations) => ({
              ...prevDurations,
              [index]: videoElement.duration,
            }));
          };

          videoElement.ontimeupdate = (e) => {
            const progress = (e.target.currentTime / e.target.duration) * 100;
            setCurrentTime((prevTimes) => ({
              ...prevTimes,
              [index]: e.target.currentTime,
            }));
            if (progress >= 30) {
              setLogView(true)
            }
          }
        }
      });
    }
  }, [videoFile]);

  const renderVideoCarousel = (videos) => {
    if (!hideRemoveButton) {
      return (
        <div>
          <video ref={(el) => videoRefs.current[0] = el} controls style={{ maxWidth: '280px', maxHeight: '180px' }}>
            <source src={backEndUrl + videos.url} type={videos.mime} />
            Sorry, we are unable to show this video.
          </video>
        </div>
      )
    }
    if (!videos.data) return null;

    return (
      <div className="owl-carousel featured_courses owl-theme owl-loaded owl-drag">
        <div className="owl-stage-outer">
          <div className="owl-stage" style={{transform: "translate3d(0px, 0px, 0px)", transition: "all", width: "100%"}}>
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
                      <video
                        ref={(el) => videoRefs.current[index] = el}
                        controls
                        style={{ borderRadius: '5px', width: '100%', maxHeight: '500px' }}
                      >
                        <source src={backEndUrl + videoData.url} type={videoData.mime} />
                        Sorry, we are unable to show this video.
                      </video>
                      <small>Duration: {videoDurations[index] ? formatDuration(videoDurations[index]) : 'Loading...'}</small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (!videoFile) return null;

  return (
    <div
      id={!hideRemoveButton ? "#media-" + file.id : ""}
      style={{
        width: '100%',
        marginTop: '2px',
        padding: hideRemoveButton ? 'none' : '10px',
        borderBottom: '1px solid ghostwhite',
      }}
    >
      <ViewsDisplay post={post} loggedInUser={loggedInUser} logView={logView} autoLogView={true}/>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        {!hideRemoveButton && (
          <div style={{ flexGrow: 1, paddingRight: '5px', marginBottom: '5px' }}>
            <p><strong>File Name:</strong> {videoFile.name}</p>
          </div>
        )}
        {renderVideoCarousel(videoFile)}
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
