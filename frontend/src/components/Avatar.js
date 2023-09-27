const Avatar = (props) => {
  return (
    <div>
      <img
        style={{ borderRadius: "100%", width: "3em", height: "3em" }}
        src={props.src}
        alt={props.alt}
      />
    </div>
  );
};

export default Avatar;
