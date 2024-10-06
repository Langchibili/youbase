'use client'

import StreamsDisplay from "@/components/Parts/EngageMents/StreamsDisplay";
import { useAudio } from "@/Contexts/AudioContext";
import { useEffect, useState } from "react";

export default function SongPlayButton(props) {
  const [songIsPlaying, setSongIsPlaying] = useState(false)
  const [logPlay, setLogPlay] = useState(false)

  // Get audioInstance and setAudioInstance from context
  const { audioInstance,setAudioInstance } = useAudio();
  useEffect(()=>{
    if(audioInstance && audioInstance.nowPlayingSongId){

        if(audioInstance.nowPlayingSongId !== props.post.id){
            setSongIsPlaying(false)
        }
    }
  },[audioInstance.nowPlayingSongId])

  const handlePlayClick = () => {
    audioInstance.audioinstance.ontimeupdate = (e)=>{
        const progress = (e.target.currentTime / e.target.duration) * 100;
        // log play after 30 percent of playing
        if (progress >= 30) {
           setLogPlay(true)
        }
    }
    if(audioInstance){
        audioInstance.addSongToPlaylist(props.post.media.data,props.post)
        audioInstance.audioinstance.play()
     }
    setAudioInstance({...audioInstance,nowPlayingSongId:props.post.id})
    setSongIsPlaying(true)
  }
  
  const handlePauseClick = () => {
    if(audioInstance){
        audioInstance.audioinstance.pause()
     }
    setSongIsPlaying(false)
  }

  return (
    <div>
      <StreamsDisplay post={props.post} loggedInUser={props.loggedInUser} logPlay={logPlay} autoLogPlay={true}/>
      {songIsPlaying? <button className="play-button" onClick={handlePauseClick}>
        <i className="uil uil-pause"></i>
      </button> : <button className="play-button" onClick={handlePlayClick}>
        <i className="uil uil-play"></i>
      </button>}
    </div>
  );
}
