"use client";
import { House, RotateCcw } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function NoreseltListing() {
  const { replace } = useRouter();
  const resetParmes = () => {
    replace(`/listing`);
  };
  return (
    <div className="text-center  py-8">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
          <House className="h-12 w-12 text-gray-400 " />
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            No results
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
        <Button
          onClick={() => resetParmes()}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
}

export default NoreseltListing;
