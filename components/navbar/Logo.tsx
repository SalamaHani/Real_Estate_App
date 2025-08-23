"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import imgdark from "../../public/imges/app_uploads_sites_barringtonteam_2024_04_Barrington-Group-Logo-lg-text-1 (laiet).webp";
import imglhait from "../../public/imges/output-onlinepngtools.png";
type NavbarProps = {
  scrolled: boolean;
};
function Logo({ scrolled }: NavbarProps) {
  return (
    <div>
      <Link href="/">
        <Image
          width="178"
          height="58"
          src={imgdark}
          alt="hero"
          className={`col-span-2 w-24 sm:w-32 md:w-40 h-auto fixed-logo ls-is-cached lazyloaded sobject-contain lg:col-span-1  ${
            scrolled ? `hidden dark:block` : `block`
          }  `}
        />
        <Image
          width="178"
          height="58"
          src={imglhait}
          alt="hero"
          className={`col-span-2 w-24 sm:w-32 md:w-40 h-auto fixed-logo ls-is-cached lazyloaded object-contain lg:col-span-1 ${
            scrolled ? `block dark:hidden` : `hidden`
          } `}
        />
      </Link>
    </div>
  );
}

export default Logo;
