"use client";
import React from "react";
import Image from "next/image";

function Imaglisting({ src, alt }: { src: string; alt: string }) {
  // Clean up malformed URLs with duplicate query parameters
  const cleanSrc = src.replace(/(\?)([^?]*)\?/g, '$1$2&');

  const handelonerror = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/imges/notfoundimg.jpg";
    e.currentTarget.removeAttribute("srcset");
  };

  return (
    <Image
      src={cleanSrc}
      alt={alt}
      fill
      className=" z-40 object-cover "
      sizes="(max-width:768px) 100vw, 600px"
      onError={handelonerror}
      unoptimized={src.includes('content.mediastg.net')}
    />
  );
}

export default Imaglisting;
