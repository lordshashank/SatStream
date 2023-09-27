// "use client";
// import Image from "next/image";
// import styles from "@/styles/page.module.css";
// import { NFTStorage } from "nft.storage";
// import { useState } from "react";
// import { MoralisProvider } from "react-moralis";
// import Header from "@/components/Header";
// import useDealStatus from "@/components/useDealStatus";
// export default function Page() {
//   const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN;
//   const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
//   const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
//   const LIGHTHOUSE_DEAL_DOWNLOAD_ENDPOINT =
//     "https://gateway.lighthouse.storage/ipfs/";

//   const [file, setFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const [jobregStatus, setJobregStatus] = useState(null);
//   const [cid, setCid] = useState(null);

//   async function upload() {
//     if (!file) {
//       console.log("No file selected");
//       return;
//     }

//     const cids = await client.storeBlob(file);
//     console.log(cids);
//   }

//   function handleFileChange(event) {
//     setFile(event.target.files[0]);
//   }
//   async function uploadFile() {
//     // Check if a file was selected
//     if (!file) {
//       alert("Please select a file to upload");
//       return;
//     }

//     // Show the uploading text
//     setUploadStatus("Uploading...");

//     // Create FormData to send the file
//     const formData = new FormData();
//     formData.append("file", file);

//     // Send the file to the server to be uploaded to lighthouse
//     const uploadResponse = await fetch(
//       `${NEXT_PUBLIC_BACKEND_URL}/api/uploadFile`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );
//     // Update the upload status
//     if (uploadResponse.ok) {
//       setUploadStatus("Upload complete!");
//     } else {
//       setUploadStatus("Upload failed");
//     }

//     const responseJson = await uploadResponse.json();

//     console.log("Uploaded file. Response: ", responseJson);

//     // Assuming that the CID is available as a property on the response object
//     const cid = responseJson.cid;
//     setCid(cid);
//   }
//   console.log(NEXT_PUBLIC_BACKEND_URL);
//   async function pollDealStatus(cid) {
//     try {
//       const response = await fetch(`/api/deal_status?cid=${cid}`, {
//         method: "GET",
//       });
//       const data = await response.json();

//       // If a 400 is returned, return it
//       if (data.error) {
//         console.error("Error:", data.error);
//         setJobregStatus("An error occurred while checking deal status.");
//         return;
//       }

//       if (data.dealInfos) {
//         // to be stored in the database
//         console.log(data);
//       } else {
//         // If deal information is not yet available, poll again after a delay
//         setTimeout(() => pollDealStatus(cid), 5000); // 5 seconds delay
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }
//   return (
//     <main className={styles.main}>
//       <Header />
//       <h1 className={styles.title}>Welcome to SatStream</h1>
//       <p className={styles.description}>
//         Get started by uploading your first video
//       </p>
//       <input type="file" onChange={handleFileChange} />
//       <button
//         onClick={async () => {
//           await uploadFile();
//           // registerJobForm();
//         }}
//       >
//         Upload
//       </button>
//       <Image
//         src="https://ipfs.io/ipfs/bafybeihfy4opphtnkbzihf5mfziioxitlqyuctnezauydnycaashti6asi/fail-mascot.gif"
//         width={400}
//         height={400}
//       />
//     </main>
//   );
// }

"use client";
import Header from "@/components/Header";
import classes from "@/styles/Upload.module.css";
import Sidebar from "@/components/Sidebar";
import UploadFile from "@/components/UploadFile";
import { useState } from "react";
import { NFTStorage } from "nft.storage";

export default function Page() {
  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN;
  const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  const LIGHTHOUSE_DEAL_DOWNLOAD_ENDPOINT =
    "https://gateway.lighthouse.storage/ipfs/";
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  async function upload() {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const cids = await client.storeBlob(file);
    console.log(cids);
  }

  async function handleFileChange(event) {
    await uploadFile(event.target.files[0]);
  }
  async function uploadFile(file) {
    // Check if a file was selected
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    // Show the uploading text
    setUploadStatus("Uploading...");

    // Create FormData to send the file
    const formData = new FormData();
    formData.append("file", file);

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
  }

  console.log(NEXT_PUBLIC_BACKEND_URL);
  async function pollDealStatus(cid) {
    try {
      const response = await fetch(`/api/deal_status?cid=${cid}`, {
        method: "GET",
      });
      const data = await response.json();

      // If a 400 is returned, return it
      if (data.error) {
        console.error("Error:", data.error);
        setJobregStatus("An error occurred while checking deal status.");
        return;
      }

      if (data.dealInfos) {
        // to be stored in the database
        console.log(data);
      } else {
        // If deal information is not yet available, poll again after a delay
        setTimeout(() => pollDealStatus(cid), 5000); // 5 seconds delay
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="page">
      <Header />
      {isOpen && (
        <UploadFile onClose={onClose} handleFileChange={handleFileChange} />
      )}
      <div className="container">
        <Sidebar />
        <div className={classes["upload-container"]}>
          <h1>Welcome to SatStream</h1>
          <p>Start by uploading first video</p>
          <button onClick={() => setIsOpen(true)} className={classes.btn}>
            Upload File
          </button>
          {/* <div className={classes["input-field"]}>
            <input type="file" id="file-upload" />
            <label htmlFor="file-upload">Upload File</label>
          </div> */}
        </div>
      </div>
    </div>
  );
}
