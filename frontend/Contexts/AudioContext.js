import { createContext, useContext, useState } from 'react';

// Create a context
const AudioContext = createContext(null);

// Create a provider component
export function AudioProvider({ children }) {
  const [audioInstance, setAudioInstance] = useState(null);

  return (
    <AudioContext.Provider value={{audioInstance, setAudioInstance}}>
      {children}
    </AudioContext.Provider>
  )
}

// Create a custom hook to use the loggedInUser
export function useAudio() {
  return useContext(AudioContext);
}
