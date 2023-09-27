"use client";
import useWeb3 from "@/components/useWeb3";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import UserVideoCard from "@/components/UserVideoCard";
import { useState, useEffect } from "react";
import classes from "@/styles/YourVideos.module.css";

export default function Page() {
  const { userAccount } = useWeb3();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        console.log("request sent");
        const walletaddress = userAccount;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/uservideo/${walletaddress}`
        );
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (userAccount) fetchVideos();
  }, [userAccount]);
  console.log(videos);
  return (
    <div className={"page"}>
      <Header />

      <div className="container">
        <Sidebar />
        <div className={classes["your-videos-container"]}>
          {videos?.map((video) => (
            <UserVideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              videoCid={video.videocid}
              thumbnailCid={video.thumbnailcid}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
