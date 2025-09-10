"use client";
import React from "react";
import Link from "next/link";
import { MotionDiv, Motionh1, MotionP } from "../motindev";
import { House } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full bg-cover bg-center flex items-center justify-center object-cover ">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="../../videos/istockphoto-1285571673-640_adpp_is.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/40" />
      <MotionDiv
        className="relative z-10 text-center text-white max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Motionh1
          className="text-6xl md:text-6xl italic  font-medium  mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Confidence and Clarity in Every Move
        </Motionh1>
        <MotionP
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Explore the best products and services we offer
        </MotionP>
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className=" flex flex-wrap justify-center  gap-4">
            <Link
              href="/sell"
              className="px-6 py-3  flex items-center italic bg-white text-black rounded-md shadow-lg text-lg font-semibold 
             transition-all duration-300 ease-in-out 
               hover:scale-105"
            >
              Search Sell Home
              <House className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/listing"
              className="px-6 py-3 bg-black flex items-center text-white italic  rounded-md shadow-lg text-lg font-semibold 
             transition-all duration-300 ease-in-out 
             hover:scale-105"
            >
              Search Buy Homes
              <House className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}
