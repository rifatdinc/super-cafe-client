import React, { useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  src: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.error("Video playback failed:", error);
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
      }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
