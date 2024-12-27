import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true); 
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/videos?id=${videoId}`);
        if (!response.ok) {
          throw new Error('Failed to load video');
        }

        
        const blob = await response.blob();
        const videoUrl = URL.createObjectURL(blob); 
        setVideoUrl(videoUrl); 
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchVideo();
  }, [videoId]);

  if (isLoading) {
    return <div>Loading video...</div>;
  }

  if (!videoUrl) {
    return <div>Error: Video not available</div>;
  }

  return (
    <div className="video-player">
      <video
        width="full"
        height="auto"
        controls
        src={videoUrl}
        type="video/mp4" 
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
