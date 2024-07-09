// client/src/components/AudioPlayer.jsx
import React from 'react'

const AudioPlayer = ({ audioFile }) => {
  return (
    audioFile && <audio controls src={audioFile}></audio>
  )
}

export default AudioPlayer
