"use client";
import classes from "@/styles/VideoPlayer.module.css";
const VideoPlayer = ({ videoCid, onClose }) => {
  const closeHandler = (e) => {
    if (e.target.id == "myModal") {
      onClose();
    }
  };
  return (
    // <div className={classes.backdrop} id="modal" onClick={closeHandler}>
    //   <div className={classes.modal}>
    //     <div className={classes["video-player-container"]}>
    //       <div className={classes["video-player"]}>
    //         <video
    //           //   id="bunny-video"
    //           //   className="video-js vjs-16-9"
    //           data-setup="{}"
    //           controls
    //           style={{ width: "100%", height: "100%" }}
    //         >
    //           <source
    //             src={`/ipfs/${videoCid}/output.m3u8`}
    //             type="application/x-mpegURL"
    //           />
    //         </video>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className={classes["video-player-container"]}>
      <div className={classes["video-player"]}>
        <video
          id="bunny-video"
          className="video-js vjs-16-9"
          data-setup="{}"
          controls
        >
          <source
            src={`/ipfs/${videoCid}/output.m3u8`}
            type="application/x-mpegURL"
          />
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
