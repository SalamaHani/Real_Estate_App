"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { DialogDemo } from "./Dilogimg";
function ImgesListingcur({ photos }: { photos: string[] | undefined }) {
  function chunkArray(arr: string[] | undefined, size: number) {
    const result = [];
    if (!arr || size <= 0) return [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr?.slice(i, i + size));
    }
    return result;
  }
  const groupedPhotos = chunkArray(photos, 6);
  const [isopen, setisopen] = useState(false);
  const handeldilog = () => {
    setisopen(!isopen);
  };
  return (
    <Carousel className="w-full h-auto">
      <CarouselContent>
        {groupedPhotos.map((group, index) => (
          <CarouselItem key={index}>
            <div className="mt-12 mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {group.map((item, i) => (
                  <div
                    key={item + i}
                    className="group block relative overflow-hidden rounded-md"
                  >
                    <Image
                      className="w-full size-40 object-cover bg-gray-100 rounded-md dark:bg-neutral-800"
                      src={item}
                      width={250} // set width
                      height={250}
                      onClick={handeldilog}
                      alt={`photo-${index}-${i}`}
                    />
                    {/* <DialogDemo
                      isopen={isopen}
                      handeldilog={handeldilog}
                      photo={item}
                    /> */}
                  </div>
                ))}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ImgesListingcur;
