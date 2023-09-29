"use client";
import { useParams } from "next/navigation";
import classes from "@/styles/VideoPlayer.module.css";
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
            <video controls style={{ width: "100%", height: "100%" }}>
              <source
                src={`${LIGHTHOUSE_DEAL_DOWNLOAD_ENDPOINT}${videoCid}`}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
