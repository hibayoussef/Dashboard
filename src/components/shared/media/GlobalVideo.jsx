const GlobalVideo = ({
  src,
  alt,
  width,
  height,
  style,
  muted,
  loop,
  autoPlay,
  ...props
}) => {
  const globalSrc = `${process.env.REACT_APP_API_Image}${src}`;

  return (
    <video
      // controls="controls"
      width={width}
      height={height}
      style={style}
      muted={muted}
      loop={loop}
      autoPlay={autoPlay}
      {...props}
    >
      <source src={globalSrc} type="video/mp4" />
    </video>
  );
};

export default GlobalVideo;
