import React from "react";

const UserVideoCard = ({ title, description, videoCid, thumbnailCid }) => {
  return (
    <div className={"video-card"}>
      <img src={`http://ipfs.io/ipfs/${thumbnailCid}`} alt={title} />
      <div className={"video-details"}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Video CID: {videoCid}</p>
        <p>Thumbnail CID: {thumbnailCid}</p>
      </div>
    </div>
  );
};

export default UserVideoCard;
