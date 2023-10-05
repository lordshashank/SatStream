"use client";
import { useParams } from "next/navigation";
import classes from "@/styles/VideoPlayer.module.css";
import HLSPlayer from "@/components/HLSPlayer";
const Page = () => {
  const { videoCid } = useParams();
  console.log(videoCid);
  const LIGHTHOUSE_DEAL_DOWNLOAD_ENDPOINT =
    "https://gateway.lighthouse.storage/ipfs/";

  return (
    <div className={classes.backdrop} id="modal">
      <div className={classes.modal}>
        <div className={classes["video-player-container"]}>
          <div className={classes["video-player"]}>
            <video
              id="bunny-video"
              className="video-js vjs-16-9"
              data-setup="{}"
              controls
            >
              <source
                src={
                  "/ipfs/QmS29VtmK7Ax6TMmMwbwqtuKSGRJTLJAmHMW83qGvBBxhV/output.m3u8"
                }
                type="application/x-mpegURL"
              />
            </video>
            <video controls className="video-js vjs-16-9">
              <source
                src="/ipfs/bafybeiczsscdsbs7ffqz55asqdf3smv6klcw3gofszvwlyarci47bgf354/output.m3u8"
                type="application/x-mpegURL"
              />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
