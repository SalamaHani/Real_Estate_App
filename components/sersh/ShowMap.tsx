"use client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
function ShowMap() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [showMap, isshowMap] = useState("false");
  const handleSuggestedSearch = (value: string, typeParmes: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(typeParmes, value);
      isshowMap(value);
    } else {
      params.delete(typeParmes);
    }
    replace(`/listing?${params.toString()}`);
  };
  return (
    <div className=" fixed rotate-270 top-100 -right-9 z-99 ">
      <div className=" flex ">
        {showMap == "false" ? (
          <button
            onClick={() => handleSuggestedSearch("true", "Map")}
            className="p-5 cursor-pointer flex flex-col items-center justify-center  px-6 py-3 rounded-t-sm  text-white  bg-primary"
          >
            <ArrowBigUp />
            Show Map
          </button>
        ) : (
          <button
            onClick={() => handleSuggestedSearch("false", "Map")}
            className="p-5 cursor-pointer flex flex-col items-center justify-center  px-6 py-3 rounded-t-sm  text-white  bg-primary"
          >
            Hiden Map
            <ArrowBigDown />
          </button>
        )}
      </div>
    </div>
  );
}

export default ShowMap;
