import React from "react";

interface Image {
  className?: string;
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  id?: string;
}

const ImageWithBasePath = (props: Image) => {
  const altText = String(props.alt);
  const fullSrc = `${props.src}`;
  return (
    <img
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={altText}
      width={props.width}
      id={props.id}
    />
  );
};

export default ImageWithBasePath;
