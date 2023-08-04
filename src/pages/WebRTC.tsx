import React, { useEffect, useRef } from 'react'

export const WebRTC: React.FC = () => {
  const MyVideoRef = useRef<HTMLVideoElement>(null) // DOM

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true, // audio: true,        
      });

      if (MyVideoRef.current) {
        MyVideoRef.current.srcObject = stream
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getMedia()
  }, [])

  return (
    <div>
      <h1>WebRTC</h1>
      <video ref={MyVideoRef} style={{
        width: 1000,
        height: 800,
        backgroundColor: "black",
        transform: "scaleX(-1)"
      }}
        autoPlay />
    </div>
  )
}
