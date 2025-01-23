import React from "react";
import Image from "next/image";

interface Image {
  className?: string;
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

const ImageWithBasePath = (props: Image) => {
  const altText = String(props.alt);
  const fullSrc = `${props.src}`;
  return (
    <Image
      id={props.id}
      className={props.className}
      src={fullSrc}
      alt={altText}
      width={props.width}
      height={props.height}
      onClick={props.onClick}
    />
  );
};

export default ImageWithBasePath;
