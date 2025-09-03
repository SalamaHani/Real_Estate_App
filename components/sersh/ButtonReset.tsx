"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";

function ButtonReset() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isrest, setreset] = React.useState(false);
  const resetParmes = () => {
    const params = new URLSearchParams(searchParams);
    params.forEach((_, key) => {
      params.delete(key);
    });
    setreset(true);
    replace(`/listing?${params.toString()}`);
  };
  return (
    <div className="flex dark:bg-black items-center p-1 border rounded-xl  bg-white shadow-sm overflow-hidden">
      <Button
        variant="ghost"
        size="lg"
        className={`flex items-center gap-1 cursor-pointer  transition-all duration-300  font-medium ${
          isrest
            ? "bg-black dark:bg-white dark:text-black text-white shadow-sm   border border-gray-200 dark:border-gray-700"
            : "hover:bg-gray-200 g-card text-card-foreground  dark:text-gray-400"
        }`}
        onClick={() => resetParmes()}
      >
        <RotateCcw />
      </Button>
    </div>
  );
}

export default ButtonReset;
