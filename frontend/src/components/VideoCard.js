import classes from "@/styles/VideoCard.module.css";
import Avatar from "./Avatar";

const VideoCard = (props) => {
  const {
    thumbnailCid,
    title,
    channel,
    views,
    timestamp,
    channelImage,
    timeDuration,
  } = props;
  const minutes = Math.trunc(Number(timeDuration) / 60);
  const seconds = Number(timeDuration) % 60;
  return (
    <div className={classes.videoCard}>
      <div className={classes.videoCard_imgBox}>
        <img
          className={classes.videoCard_thumbnail}
          src={`https://ipfs.io/ipfs/${thumbnailCid}`}
          alt=""
        />
        <p className={classes.imageTime}>{`${minutes}:${seconds}`}</p>
      </div>

      <div className={classes.videoCard_info}>
        <Avatar
          src={channelImage}
          alt={channel}
          className={classes.videoCard_avatar}
        />
        <div className={classes.videoCard_text}>
          <h5>{title}</h5>
          <p>{channel}</p>
          <div className={classes.viewsAndTime}>
            <p>{views} views </p>
            <p> • {timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
