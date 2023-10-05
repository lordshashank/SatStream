"use client";
import classes from "@/styles/UploadFile.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { MdUpload } from "react-icons/md";
import useWeb3 from "./useWeb3";
import VideoDetails from "./VideoDetails";
import useDealStatus from "./useDealStatus";
import useDatabase from "../components/useDatabase";
const UploadFile = ({ onClose }) => {
  const { userAccount } = useWeb3();
  const [isUploaded, setIsUploaded] = useState(false);
  const [duration, setDuration] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [details, setDetails] = useState({ title: "", desc: "" });
  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { submitCid } = useDealStatus();

  const publishDisabled =
    details.title.length === 0 ||
    details.desc.length === 0 ||
    !video ||
    !thumbnail;

  const { createDatabase, writeInDatabase, readDatabase, globalDatabaseName } =
    useDatabase();

  const writeDb = async (video) => {
    const videos = await readDb();
    const rs = await writeInDatabase(
      globalDatabaseName,
      videos.length + 1,
      JSON.stringify(video)
    );
    console.log(rs);
  };
  const readDb = async () => {
    const rs = await readDatabase(globalDatabaseName);
    console.log(rs);
    return rs;
  };

  const closeHandler = (e) => {
    if (e.target.id == "modal") {
      onClose();
    }
  };

  async function handleFileChange(event) {
    const file = event.target.files[0];

    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);

    // Wait for the metadata to load
    await new Promise((resolve) => {
      video.addEventListener("loadedmetadata", resolve);
    });

    // Get the duration of the video in seconds
    const duration = Math.round(video.duration);
    setDuration(duration);
    setVideo(file);
    setIsUploaded(true);
  }

  const onPublish = async () => {
    if (thumbnail == null || video == null || !userAccount) return;
    const formData = new FormData();
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);
    try {
      const uploadResponse = await fetch(
        `${NEXT_PUBLIC_BACKEND_URL}/api/uploadFile`,
        {
          method: "POST",
          body: formData,
        }
      );
      const cids = await uploadResponse.json();
      console.log(cids);
      await submitCid(cids.cid.lighthouse);
      const videoData = {
        videocid: cids.cid.video,
        duration: duration,
        created: new Date(),
        thumbnailcid: cids.cid.thumbnail,

        title: details.title,
        description: details.desc,

        account: userAccount,
      };

      console.log(videoData);
      await writeDb(videoData);
    } catch (err) {
      console.log(err);
    }
    onClose();
  };

  return (
    <div className={classes.backdrop} id="modal" onClick={closeHandler}>
      <div className={classes.modal}>
        <div className={classes.top}>
          <h2>{isUploaded ? video.name : "Upload File"}</h2>
          <button onClick={onClose}>
            <AiOutlineClose size={30} />
          </button>
        </div>
        {!isUploaded ? (
          <div className={classes["input-field"]}>
            <input type="file" id="file-upload" onChange={handleFileChange} />
            <label htmlFor="file-upload" className={classes["icon-label"]}>
              <MdUpload size={90} color="#aaa" />
            </label>
            <div className={classes.text}>
              <h6>Drag and drop video files to upload</h6>
              <p>Your videos will be private until you publish them.</p>
            </div>
            <label htmlFor="file-upload">Select Files</label>
          </div>
        ) : (
          <VideoDetails
            setDetails={setDetails}
            onPublish={onPublish}
            file={video}
            setThumbnail={setThumbnail}
            publishDisabled={publishDisabled}
          />
        )}
      </div>
    </div>
  );
};

export default UploadFile;
