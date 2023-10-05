"use client";
import VideoCard from "@/components/VideoCard";
import Header from "@/components/Header";
import classes from "@/styles/Page.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import useDatabase from "../components/useDatabase";
import useWeb3 from "@/components/useWeb3";

const video1 = {
  id: 0,
  name: {
    videocid: "QmcaDyhLfunUx1x96wmBZLh4DWV4KCSoU8ywNuRusoHLvA",
    thumbnailcid: "bafkreihe5bdoogw5qewimrgmnzf5obdwwogw2p4zf4pgt6mfyvqs6yf5ze",
    duration: "165",
    title: "Saibo",
    description: "A song ok",
    created: "2023-09-26T23:02:26.710+00:00",
    filename: "Saibo.mp4",
    _id: "65136302e7504d2518a26d04",
    channelImage: "/SatStream.jpeg",
  },
};

const views = ["3", "1", "1", "1", "1", "1", "1"];
export default function Page() {
  const [videos, setVideos] = useState([video1]);
  const {
    createDatabase,
    writeInDatabase,
    readDatabase,
    globalDatabaseName: databaseName,
  } = useDatabase();
  // const [databaseName, setDatabaseName] = useState("SatStream_314159_569");
  const { userAccount } = useWeb3();
  useEffect(() => {
    async function fetchVideos() {
      try {
        console.log("request sent");
        const videoData = await readDatabase(databaseName);

        setVideos(videoData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVideos();
  }, []);
  const writeDb = async () => {
    const videos = await readDb();

    const video = [
      {
        videocid: "QmTv2Tx9XQeLrvg8rs9LCCih6FrHt2mXs3LVBt23ZD7eE7",
        thumbnailcid:
          "bafybeichbrv7je3rh3iruelibdrcqd7cgtkt3yflf2j5pmtqwaeig7rm3i",
        title: "Shrek full",
        description: "final testing",
        account: userAccount,
      },
    ];
    video.forEach(async (video, index) => {
      const rs = await writeInDatabase(
        databaseName,
        index + 1,
        JSON.stringify(video)
      );
      console.log(rs);
    });
  };
  const readDb = async () => {
    const rs = await readDatabase(databaseName);
    console.log(rs);
    return rs;
  };
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
          {videos?.map((videoArray, index) => {
            const { name: video } = videoArray;
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
                  timeDuration={video.duration}
                />
              </Link>
            );
          })}
        </main>
        <button
          onClick={async () => {
            console.log(await createDatabase("SatStream"));
          }}
        >
          create Database
        </button>
        <button
          onClick={async () => {
            await writeDb();
          }}
        >
          write Database
        </button>
        <button
          onClick={async () => {
            await readDatabase(databaseName);
          }}
        >
          read Database
        </button>
      </div>
    </>
  );
}
