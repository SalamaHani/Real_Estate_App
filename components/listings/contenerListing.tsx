import Link from "next/link";
import React from "react";
import { MapPin } from "lucide-react";
import { Areacuntry } from "@prisma/client";
import Imaglisting from "../listing/Imaglisting";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
function Contenerlisting({ cuntryar }: { cuntryar: Areacuntry }) {
  const { name, photos } = cuntryar;
  return (
    <>
      <div className="group relative block rounded-sm overflow-hidden focus:outline-hidden">
        <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {photos.map((src, i) => (
                <CarouselItem key={i} className="relative aspect-[16/10]">
                  {photos.length == 1 ? null : (
                    <CarouselPrevious className="left-8" />
                  )}
                  <Link href={`/communities/${name}`}>
                    <Imaglisting src={src} alt={src} />
                  </Link>
                  {photos.length == 1 ? null : (
                    <CarouselNext className="right-4" />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="absolute bottom-0 start-0 end-0 p-1 sm:p-2">
          <div className="text-xs flex  items-center font-semibold bg-[#06232e78] text-white rounded-lg  p-2 md:text-sm  dark:text-neutral-200">
            <MapPin className="h-3 w-3 mr-2" />
            {name}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contenerlisting;
