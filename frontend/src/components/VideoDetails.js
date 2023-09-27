import classes from "@/styles/VideoDetails.module.css";
import { AiOutlineFileImage } from "react-icons/ai";
import { NFTStorage } from "nft.storage";
import Link from "next/link";
const VideoDetails = ({
  videoCid,
  setDetails,
  setCid,
  onPublish,
  cid,
  file,
}) => {
  const onChangeHandler = (name) => (event) => {
    setDetails((prev) => ({ ...prev, [name]: event.target.value }));
  };
  const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN;
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  const handleThumbnailChange = async (event) => {
    await upload(event.target.files[0]);
  };

  async function upload(file) {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const cids = await client.storeBlob(file);
    console.log(cids);
    setCid((prev) => ({ ...prev, thumbnail: cids }));
  }
  return (
    <>
      <div className={classes.below}>
        <div className={classes["take-details"]}>
          <div className={classes["details-section"]}>
            <h2>Details</h2>
            <div className={classes["input-area"]}>
              <label htmlFor="title">Title(required)</label>
              <textarea
                rows={4}
                type="text"
                id="title"
                onChange={onChangeHandler("title")}
              />
            </div>
            <div className={classes["input-area"]}>
              <label htmlFor="desc">Description</label>
              <textarea
                rows={8}
                type="text"
                id="desc"
                onChange={onChangeHandler("desc")}
              />
            </div>
          </div>
          <div className={classes["thumbnail-section"]}>
            <h2>Thumbnail</h2>
            <p>
              Select or upload a picture that shows what's in your video. A good
              thumbnail stands out and draws viewers' attention.
            </p>
            <div className={classes["input-area"]}>
              <label htmlFor="thumbnail">
                <AiOutlineFileImage size={50} />
                <p>Upload Thumbnail</p>
              </label>
              <input
                style={{ display: "none" }}
                type="file"
                id="thumbnail"
                onChange={handleThumbnailChange}
              />
            </div>
            {cid.thumbnail.length > 0 && (
              <>
                <p>Thumbnail CID</p>
                <h6>{cid.thumbnail}</h6>
              </>
            )}
          </div>
        </div>
        <div className={classes["video-details"]}>
          {/* <iframe src={`"https://ipfs.io/ipfs/${videoCid}"`} /> */}
          <div>
            <p>Video Link</p>
            <Link
              className={classes.link}
              href={`https://gateway.lighthouse.storage/ipfs/${videoCid}`}
            >
              https://gateway.lighthouse.storage/ipfs/{videoCid}
            </Link>
          </div>
          <div>
            <p>FileName</p>
            <p>{file?.name}</p>
          </div>
        </div>
      </div>
      <div className={classes.top}>
        <button onClick={onPublish} className={classes.btn}>
          Publish
        </button>
      </div>
    </>
  );
};

export default VideoDetails;