"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Button } from "../ui/button";

function FramMapscuntry({ Maps }: { Maps: string | null }) {
  const [showMap, setShowMap] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setShowMap(true)}
        className="px-6 py-3 italic bg-white text-black rounded-md text-lg font-medium shadow-md"
      >
        View Map
      </Button>
      <AnimatePresence>
        {showMap && (
          <div className="w-full h-screen flex flex-col items-center justify-center ">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 w-full h-screen z-50 "
            >
              <iframe
                src={Maps ?? ""}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <Button
                onClick={() => setShowMap(false)}
                className="absolute top-28 right-4 bg-red-500 hover:bg-red-600 text-white"
              >
                Close Maps
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FramMapscuntry;
