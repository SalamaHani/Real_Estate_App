"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";

function ButtonReset() {
  const { replace } = useRouter();
  const [isrest, setreset] = React.useState(false);
  const resetParmes = () => {
    setreset(true);
    replace(`/listing`);
  };
  return (
    <div className="flex  items-center p-1 border rounded-xl   shadow-sm ">
      <Button
        variant="ghost"
        size="lg"
        className={`flex items-center gap-1 cursor-pointer  transition-all duration-300  font-medium ${
          isrest
            ? "bg-primary  shadow-sm   border text-black"
            : "g-card text-card-foreground  "
        }`}
        onClick={() => resetParmes()}
      >
        <RotateCcw />
      </Button>
    </div>
  );
}

export default ButtonReset;
