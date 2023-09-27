"use client";
import VideoCard from "@/components/VideoCard";
import Header from "@/components/Header";
import classes from "@/styles/Page.module.css";
import Link from "next/link";
import useWeb3 from "@/components/useWeb3";
import { useState, useEffect } from "react";
import { useDatabase } from "../components/useDatabase";
const video1 = {
  id: "2eliQ_KR8yA",
  image:
    "https://i.ytimg.com/vi/2eliQ_KR8yA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA6fW_hT1HcvbPTKBWYSOwB_pKK-w",
  title:
    "KHAAB || AKHIL || PARMISH VERMA || NEW PUNJABI SONG 2018 || CROWN RECORDS ||",
  channel: "Crown Records",
  views: "66 crore views",
  timestamp: "6 years ago",
  channelImage:
    "https://yt3.ggpht.com/ytc/AMLnZu8TdgskFgONZuAfOBszVS6N2Xt5xs9_SWolFPRCrQ=s68-c-k-c0x00ffffff-no-rj",
  timeDuration: "3:39",
};

export default function Page() {
  const { userAccount } = useWeb3();
  const [videos, setVideos] = useState([]);
  const { createDatabase } = useDatabase();
  async function fetchVideos() {
    try {
      console.log("request sent");
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/allvideo`
      );
      const data = await response.json();
      setVideos(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <>
      <Header />
      <div className={classes.container}>
        <main className={classes["videos-container"]}>
          {videos?.map((video) => (
            <Link href={`/video-player/${video.videocid}`}>
              <VideoCard
                thumbnailCid={video.thumbnailcid}
                title={video.title}
                channel={"crown records"}
                views={"50000"}
                timestamp={video1.timestamp}
                channelImage={video1.channelImage}
                timeDuration={video1.timeDuration}
              />
            </Link>
          ))}
          <button onClick={createDatabase("satStream")}>Create Database</button>
        </main>
      </div>
    </>
  );
}
