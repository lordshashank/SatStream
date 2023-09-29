"use client";
import VideoCard from "@/components/VideoCard";
import Header from "@/components/Header";
import classes from "@/styles/Page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
const video1 = {
  videocid: "QmcaDyhLfunUx1x96wmBZLh4DWV4KCSoU8ywNuRusoHLvA",
  thumbnailcid: "bafkreihe5bdoogw5qewimrgmnzf5obdwwogw2p4zf4pgt6mfyvqs6yf5ze",
  duration: "165",
  title: "Saibo",
  description: "A song ok",
  created: "2023-09-26T23:02:26.710+00:00",
  filename: "Saibo.mp4",
  _id: "65136302e7504d2518a26d04",
  channelImage:
    "https://yt3.ggpht.com/ytc/AMLnZu8TdgskFgONZuAfOBszVS6N2Xt5xs9_SWolFPRCrQ=s68-c-k-c0x00ffffff-no-rj",
};

const views = ["3", "1", "1", "1", "1", "1", "1"];
export default function Page() {
  const [videos, setVideos] = useState([video1]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        console.log("request sent");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/allvideo`
        );
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (process.env.NEXT_PUBLIC_BACKEND_URL) fetchVideos();
  }, []);

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
              <Link
                href={`/video-player/${video.videocid}`}
                key={video.videocid}
              >
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
        </main>
      </div>
    </>
  );
}
