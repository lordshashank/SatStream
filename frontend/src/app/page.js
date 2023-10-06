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
    videocid: "bafybeibiihqbyyd6jtu56jy5x2pqr6mmoxufx6oiayxywlfokyxeos7zyy",
    thumbnailcid: "bafybeid64qxgt3hy533uspw6epeno62zxxvpbevno4z3yb4vhkrdh7373i",
    duration: "29",
    title: "Nature",
    description: "Test",
    created: "2023-09-26T23:02:26.710+00:00",
    filename: "nature.mp4",
    _id: "65136302e7504d2518a26d04",
    channelImage: "/SatStream.jpeg",
  },
};

const views = [
  "3",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "3",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "3",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
];
export default function Page() {
  const [videos, setVideos] = useState([video1]);
  const [playVideo, setPlayVideo] = useState({ isPlay: false, cid: "" });
  const {
    createDatabase,
    writeInDatabase,
    readDatabase,
    globalDatabaseName: databaseName,
  } = useDatabase();
  const { userAccount } = useWeb3();
  useEffect(() => {
    async function fetchVideos() {
      try {
        console.log("request sent");
        const videoData = await readDatabase(databaseName);
        if (videoData) setVideos(videoData);
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
        account: "0xce340d9a71b2aa8f7faa2f989158f14bede3e1b2",
        created: new Date(),
        description: "A butterfly",
        duration: 29,
        thumbnailcid:
          "bafybeid64qxgt3hy533uspw6epeno62zxxvpbevno4z3yb4vhkrdh7373i",
        title: "Butterfly",
        videocid: "bafybeic4jzstavqoi67vsjbzj573kuev43vtqoh7ye4ttzcfpn2hhfeyzm",
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
          {videos.length > 0 ? (
            videos?.map((videoArray, index) => {
              const { name: video } = videoArray;
              const currentTime = new Date();
              const videoCreationTime = new Date(video.created);
              const timeDifferenceMilliseconds =
                currentTime - videoCreationTime;

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
            })
          ) : (
            <h1>
              Be the first One to upload an video.{" "}
              <Link href={"/upload"}>Click Here</Link>
            </h1>
          )}
        </main>
        {/* <button
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
        </button> */}
      </div>
    </>
  );
}
