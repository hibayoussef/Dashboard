const GlobalImage = ({ src, alt, width, height, style, ...props }) => {
  const globalSrc = `${process.env.REACT_APP_API_Image}${src}`;

  return (
    <img
      alt={alt}
      src={globalSrc}
      width={width}
      height={height}
      style={style}
      {...props}
    />
  );
};

export default GlobalImage;
