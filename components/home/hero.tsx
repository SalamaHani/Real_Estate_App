"use client";
import React from "react";
import Link from "next/link";
import { MotionDiv, Motionh1, MotionP } from "../motindev";
import { House } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen w-full bg-cover bg-center flex items-center justify-center object-cover">
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
        className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Motionh1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic font-medium mb-4 sm:mb-6 leading-tight"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Confidence and Clarity in Every Move
        </Motionh1>
        <MotionP
          className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto"
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
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4">
            <Link
              href="/sell"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 flex items-center justify-center italic bg-primary text-primary-foreground rounded-md shadow-lg text-base sm:text-lg font-semibold 
             transition-all duration-300 ease-in-out 
               hover:scale-105 hover:shadow-xl hover:opacity-90"
            >
              Search Sell Home
              <House className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
            <Link
              href="/listing"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-accent flex items-center justify-center text-white italic rounded-md shadow-lg text-base sm:text-lg font-semibold 
             transition-all duration-300 ease-in-out 
             hover:scale-105 hover:shadow-xl hover:opacity-90"
            >
              Search Buy Homes
              <House className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Link>
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}
