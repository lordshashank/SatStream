"use client";
import { useParams } from "next/navigation";
import classes from "@/styles/VideoPlayer.module.css";
const Page = () => {
  const { videoCid } = useParams();
  console.log(videoCid);
  const LIGHTHOUSE_DEAL_DOWNLOAD_ENDPOINT =
    "https://gateway.lighthouse.storage/ipfs/";

  return (
    <div className={classes["video-player-container"]}>
      <div className={classes["video-player"]}>
        <video
          id="bunny-video"
          className="video-js vjs-16-9"
          data-setup="{}"
          controls
          style={{ width: "100%", minHeight: "100vh" }}
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

export default Page;
