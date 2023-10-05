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
  const [uploadStatus, setUploadStatus] = useState(null);
  const [duration, setDuration] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [details, setDetails] = useState({ title: "", desc: "" });
  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { submitCid } = useDealStatus();

  const { createDatabase, writeInDatabase, readDatabase, globalDatabaseName } =
    useDatabase();
  // const [databaseName, setDatabaseName] = useState("");
  // const globalDatabaseName = "che_314159_568";

  const writeDb = async (video) => {
    const videos = await readDb();
    // console.log(videos);
    console.log(videos.length);
    // console.log(video);
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

  // async function createUserTable(title, videoCid, index) {
  //   const prefix = "calib_80001_" + title;
  //   const result = await createDatabase(prefix);
  //   await writeInDatabase(prefix, index, videoCid);
  //   console.log(result);
  // }

  const closeHandler = (e) => {
    if (e.target.id == "modal") {
      onClose();
    }
  };

  async function handleFileChange(event) {
    // await createDatabase("chec");
    console.log("handle file change");
    setVideo(event.target.files[0]);
    setIsUploaded(true);
    // if (userAccount) await uploadFile(event.target.files[0]);
    // else return;
  }
  async function uploadFile(file) {
    // Check if a file was selected
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    console.log("running upload file function");
    // Show the uploading text
    setUploadStatus("Uploading...");
    // Create a video element to get the duration
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);

    // Wait for the metadata to load
    await new Promise((resolve) => {
      video.addEventListener("loadedmetadata", resolve);
    });

    // Get the duration of the video in seconds
    const duration = Math.round(video.duration);
    setDuration(duration);

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("address", userAccount);
    formData.append("duration", duration);
    console.log(userAccount);

    // Send the file to the server to be uploaded to lighthouse
    const uploadResponse = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/uploadFile`,
      {
        method: "POST",
        body: formData,
      }
    );
    // Update the upload status
    if (uploadResponse.ok) {
      setUploadStatus("Upload complete!");
    } else {
      setUploadStatus("Upload failed");
    }

    const responseJson = await uploadResponse.json();

    console.log("Uploaded file. Response: ", responseJson);

    // Assuming that the CID is available as a property on the response object
    const cid = responseJson.cid;
    if (uploadResponse.ok) {
      setIsUploaded(true);
      setCid((prev) => ({ ...prev, video: cid }));
    }
  }

  const onPublish = async () => {
    if (thumbnail == null || video == null) return;
    const formData = new FormData();
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);
    const uploadResponse = await fetch(
      `${NEXT_PUBLIC_BACKEND_URL}/api/uploadFile`,
      {
        method: "POST",
        body: formData,
      }
    );
    const cids = await uploadResponse.json();
    console.log(cids);
    // await submitCid(cid.video);
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
    // const data = {
    //   video: videoData,
    //   user: {
    //     walletaddress: userAccount,
    //   },
    // };
    // const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/publish`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const responseJson = await response.json();
    // console.log(videoData);
    // await writeDb(videoData);

    // console.log("Uploaded file ");
    // onClose();
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
          />
        )}
      </div>
    </div>
  );
};

export default UploadFile;
