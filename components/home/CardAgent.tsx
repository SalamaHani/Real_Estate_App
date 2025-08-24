import React from "react";
import Image from "next/image";
function CardAgent() {
  return (
    <div className="text-center">
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-xl sm:size-48 lg:size-60 mx-auto"
      />
      <div className="mt-2 sm:mt-4">
        <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg dark:text-neutral-200">
          David Forren
        </h3>
        <p className="text-xs text-gray-600 sm:text-sm lg:text-base dark:text-neutral-400">
          Founder / CEO
        </p>
      </div>
    </div>
  );
}

export default CardAgent;
