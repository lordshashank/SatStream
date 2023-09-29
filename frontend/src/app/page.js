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
  timestamp: "",
  channelImage:
    "https://yt3.ggpht.com/ytc/AMLnZu8TdgskFgONZuAfOBszVS6N2Xt5xs9_SWolFPRCrQ=s68-c-k-c0x00ffffff-no-rj",
  timeDuration: "3:39",
};

async function fetchVideos() {
  try {
    console.log("request sent");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/allvideo`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
const views = ["3", "1", "1", "1", "1", "1", "1"];
export default async function Page() {
  const videos = await fetchVideos();

  if (!videos) {
    return <div>Loading...</div>;
  }

  const timeUnits = [
    { unit: "year", milliseconds: 365 * 24 * 60 * 60 * 1000 },
    { unit: "month", milliseconds: 30 * 24 * 60 * 60 * 1000 },
    { unit: "day", milliseconds: 24 * 60 * 60 * 1000 },
    { unit: "hour", milliseconds: 60 * 60 * 1000 },
    { unit: "minute", milliseconds: 60 * 1000 },
    { unit: "second", milliseconds: 1000 },
  ];

  return (
    <>
      <Header />
      <div className={classes.container}>
        <main className={classes["videos-container"]}>
          {videos?.map((video, index) => {
            const currentTime = new Date();
            const videoCreationTime = new Date(video.created);
            const timeDifferenceMilliseconds = currentTime - videoCreationTime;

            let maxTimeUnit = timeUnits[timeUnits.length - 1];
            for (let i = 0; i < timeUnits.length; i++) {
              const timeUnit = timeUnits[i];
              if (timeDifferenceMilliseconds >= timeUnit.milliseconds) {
                maxTimeUnit = timeUnit;
                break;
              }
            }

            const timeDifference =
              Math.round(
                timeDifferenceMilliseconds / maxTimeUnit.milliseconds
              ) +
              " " +
              maxTimeUnit.unit +
              (Math.round(
                timeDifferenceMilliseconds / maxTimeUnit.milliseconds
              ) > 1
                ? "s"
                : "") +
              " ago";
            return (
              <Link href={`/video-player/${video.videocid}`}>
                <VideoCard
                  thumbnailCid={video.thumbnailcid}
                  title={video.title}
                  channel={"Testing"}
                  views={views[index]}
                  timestamp={timeDifference}
                  channelImage={video1.channelImage}
                  timeDuration={video.duration}
                />
              </Link>
            );
          })}
          <button onClick={createDatabase("satStream")}>Create Database</button>
        </main>
      </div>
    </>
  );
}
