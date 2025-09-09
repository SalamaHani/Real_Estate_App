"use client";
import React, { useEffect, useState } from "react";
import Continer from "../global/Continer";
import Logo from "./Logo";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import { Session } from "@/lib/auth";
import CurrencySelector from "./Curentreat";
function Navbar({ session }: { session: Session | null }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <nav
        className={` absolute  top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-white dark:bg-black shadow-md fixed" : "bg-transparent"
        }`}
      >
        <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="../../public/istockphoto-1285571673-640_adpp_is.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <Continer className="flex justify-between md:flex-row md:justify-between md:items-center flex-wrap py-5 gap-4">
          <Logo scrolled={scrolled} />
          <div className=" flex gap-4 items-center  ">
            <CurrencySelector />
            <DarkMode />
            <LinksDropdown session={session} />
          </div>
        </Continer>
      </nav>
    </>
  );
}

export default Navbar;
