"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { NFTStorage } from "nft.storage";
import { useState } from "react";

export default function Home() {
  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN;

  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const [file, setFile] = useState(null);

  async function upload() {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const cid = await client.storeBlob(file);
    console.log(cid);
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to SatStream</h1>
      <p className={styles.description}>
        Get started by uploading your first video
      </p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={upload}>Upload</button>
      <Image
        src="https://ipfs.io/ipfs/bafybeihfy4opphtnkbzihf5mfziioxitlqyuctnezauydnycaashti6asi/fail-mascot.gif"
        width={400}
        height={400}
      />
    </main>
  );
}
