"use client";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
const Page = () => {
  const { videoCid } = useParams();
  console.log(videoCid);
  const LIGHTHOUSE_DEAL_DOWNLOAD_ENDPOINT =
    "https://gateway.lighthouse.storage/ipfs/";

  return (
    <>
      <Header />
      <div className="video-player-container">
        <div className="video-player">
          <video controls>
            <source
              src={`${LIGHTHOUSE_DEAL_DOWNLOAD_ENDPOINT}${videoCid}`}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </>
  );
};

export default Page;
