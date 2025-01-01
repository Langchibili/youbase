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
    if(audioInstance){
        if(audioInstance && audioInstance.nowPlayingSongId){

            if(audioInstance.nowPlayingSongId !== props.post.id){
                setSongIsPlaying(false)
            }
        }
   }
  },[audioInstance?.nowPlayingSongId])

  const handlePlayClick = (e) => {
    if(e){
      e.preventDefault()
      e.stopPropagation(); // Prevent parent click handler
    }
    if(audioInstance){
      console.log(audioInstance)
        audioInstance.audioinstance.ontimeupdate = (e)=>{
            const progress = (e.target.currentTime / e.target.duration) * 100;
            // log play after 30 percent of playing
            if (progress >= 10) {
            setLogPlay(true)
            }
        }
        
        if(audioInstance.nowPlayingSongId === props.post.id){ // if this is the same song which was playing before you paused the audio
          audioInstance.audioinstance.play()
          setSongIsPlaying(true)
          return
        }
        else{
          audioInstance.addSongToPlaylist(props.post.media.data,props.post)
          audioInstance.audioinstance.play()
          setAudioInstance({...audioInstance,nowPlayingSongId:props.post.id})
          setSongIsPlaying(true)
        }
    }
    else{
        alert('something went wrong playing this audio')
    }
  }
  
  const handlePauseClick = (e) => {
    if(e){
      e.preventDefault()
      e.stopPropagation(); // Prevent parent click handler
    }
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
