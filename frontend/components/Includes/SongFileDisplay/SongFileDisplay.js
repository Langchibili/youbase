import { backEndUrl, log } from '@/Constants';
import React, { useState, useEffect } from 'react';

// Helper function to format the duration
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60)
  const seconds = Math.floor(duration % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
};

// The SongFile component
export default function SongFileDisplay({ file, handleRemoveMedia }){
  const [audioDuration, setAudioDuration] = useState(null)
  const audioRef = React.createRef()

  // Calculate duration once the component mounts
  useEffect(() => {
    const audioElement = audioRef.current;
    log(backEndUrl+file.attributes.url)
    if (audioElement) {
      audioElement.addEventListener('loadedmetadata', () => {
        setAudioDuration(audioElement.duration);
      });

      return () => {
        audioElement.removeEventListener('loadedmetadata', () => {
          setAudioDuration(audioElement.duration);
        });
      };
    }
  }, [])

  return (
    <div id={"#media-"+file.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <div style={{ flexGrow: 1 }}>
        <p><strong>File Name:</strong> {file.attributes.name}</p>
        <p><strong>Duration:</strong> {audioDuration ? formatDuration(audioDuration) : 'Loading...'}</p>
      </div>
      <audio ref={audioRef} controls style={{ marginRight: '10px' }}>
        <source src={backEndUrl+file.attributes.url} type={file.attributes.mime} />
         sorry we are unable to show this audio file
      </audio>
      <button onClick={() => handleRemoveMedia(file.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
        Remove
      </button>
    </div>
  )
}
