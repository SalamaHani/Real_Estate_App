"use client";
import React from "react";
import Link from "next/link";
import { MotionDiv, Motionh1, MotionP } from "../motindev";

export default function HeroSection() {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center object-cover "
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3)`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <MotionDiv
        className="relative z-10 text-center text-white max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Motionh1
          className="text-5xl md:text-6xl font-bold mb-6"
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
          <div className=" flex flex-wrap justify-center  gap-2">
            <Link
              href="/shop"
              className="px-6 py-3 text-white bg-accent-foreground  dark:text-black rounded-sm shadow-lg text-lg font-semibold transition"
            >
              Search Sale Homes
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 text-white bg-accent-foreground dark:text-black rounded-sm  shadow-lg text-lg font-semibold transition"
            >
              Search Rental Homes
            </Link>
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}
