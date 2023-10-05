"use client";
import useWeb3 from "@/components/useWeb3";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import UserVideoCard from "@/components/UserVideoCard";
import { useState, useEffect } from "react";
import classes from "@/styles/YourVideos.module.css";
import useDatabase from "@/components/useDatabase";
export default function Page() {
  const { userAccount } = useWeb3();
  const [videos, setVideos] = useState([]);
  const { readDatabase, globalDatabaseName } = useDatabase();
  useEffect(() => {
    async function fetchVideos() {
      const videos = await readDatabase(globalDatabaseName);
      const filteredVideos = videos.filter(
        (video) => video.name.account === userAccount
      );
      setVideos(filteredVideos);
    }
    if (userAccount) fetchVideos();
  }, [userAccount]);
  console.log(videos);

  if (!userAccount) return <h1>Connect to Wallet to watch your uploads.</h1>;
  return (
    <div className={"page"}>
      <Header />

      <div className="container">
        <Sidebar />
        <div className={classes["your-videos-container"]}>
          {!userAccount ? (
            <h1>Connect to Wallet to watch your uploads.</h1>
          ) : videos.length > 0 ? (
            videos.map((videoArray, index) => {
              const { name: video } = videoArray;
              return (
                <UserVideoCard
                  key={video?.id || index}
                  title={video?.title}
                  description={video?.description}
                  videoCid={video?.videocid}
                  thumbnailCid={video?.thumbnailcid}
                />
              );
            })
          ) : (
            <h1>You don't have any uploads</h1>
          )}
        </div>
      </div>
    </div>
  );
}
