import Image from "next/image";
import Link from "next/link";
import React from "react";
import imges from "../../public/imges/daniel-barnes-RKdLlTyjm5g-unsplash.jpg";
import { MapPin } from "lucide-react";
function ContenerListing() {
  return (
    <>
      <Link
        className="group relative block rounded-sm overflow-hidden focus:outline-hidden"
        href="#"
      >
        <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
          <Image
            src={imges}
            alt={"tgt"}
            className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl w-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 start-0 end-0 p-1 sm:p-2">
          <div className="text-xs flex  items-center font-semibold bg-[#06232e78] text-white rounded-lg  p-2 md:text-sm  dark:text-neutral-200">
            <MapPin className="h-3 w-3 mr-2" /> Workplace personalities
          </div>
        </div>
      </Link>
    </>
  );
}

export default ContenerListing;
