"use client";
import classes from "@/styles/UploadFile.module.css";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";
import { MdUpload } from "react-icons/md";
import useWeb3 from "./useWeb3";
import VideoDetails from "./VideoDetails";
import useDealStatus from "./useDealStatus";
const UploadFile = ({ onClose }) => {
  const { userAccount } = useWeb3();
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [file, setFile] = useState(null);
  const [details, setDetails] = useState({ title: "", desc: "" });
  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { submitCid } = useDealStatus();
  const [cid, setCid] = useState({
    thumbnail: "",
    video: "",
  });
  const closeHandler = (e) => {
    if (e.target.id == "modal") {
      onClose();
    }
  };

  async function handleFileChange(event) {
    console.log("handle file change");
    setFile(event.target.files[0]);
    if (userAccount) await uploadFile(event.target.files[0]);
    else return;
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

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("address", userAccount);
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
    await submitCid(cid.video);
    const data = {
      video: {
        videocid: cid.video,
        thumbnailcid: cid.thumbnail,
        title: details.title,
        description: details.desc,
      },
      user: {
        walletaddress: userAccount,
      },
    };
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    console.log("Uploaded file. Response: ", responseJson);
    onClose();
  };

  return (
    <div className={classes.backdrop} id="modal" onClick={closeHandler}>
      <div className={classes.modal}>
        <div className={classes.top}>
          <h2>{isUploaded ? file.name : "Upload File"}</h2>
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
            videoCid={cid.video}
            setDetails={setDetails}
            setCid={setCid}
            onPublish={onPublish}
            cid={cid}
            file={file}
          />
        )}
      </div>
    </div>
  );
};

export default UploadFile;
