import classes from "@/styles/VideoDetails.module.css";
import { AiOutlineFileImage } from "react-icons/ai";
const VideoDetails = ({
  setDetails,
  onPublish,
  file,
  setThumbnail,
  publishDisabled,
}) => {
  const onChangeHandler = (name) => (event) => {
    setDetails((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleThumbnailChange = async (event) => {
    setThumbnail(event.target.files[0]);
  };

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
          </div>
        </div>
        <div className={classes["video-details"]}>
          {/* <iframe src={`"https://ipfs.io/ipfs/${videoCid}"`} /> */}
          {/* <div>
            <p>Video Link</p>
            <Link
              className={classes.link}
              href={`https://gateway.lighthouse.storage/ipfs/${videoCid}`}
            >
              https://gateway.lighthouse.storage/ipfs/{videoCid}
            </Link>
          </div> */}
          <div>
            <p>FileName</p>
            <p>{file?.name}</p>
          </div>
        </div>
      </div>
      <div className={classes.top}>
        <button
          onClick={onPublish}
          className={classes.btn}
          disabled={publishDisabled}
        >
          Publish
        </button>
      </div>
    </>
  );
};

export default VideoDetails;
