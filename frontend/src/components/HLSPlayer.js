import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-hls";

const HLSPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize video.js
    const player = videojs(videoRef.current, {
      controls: true,
      fluid: true,
    });

    // Add the HLS source to the player
    player.src({
      src,
      type: "application/x-mpegURL",
    });

    // Cleanup when the component unmounts
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [src]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default HLSPlayer;
