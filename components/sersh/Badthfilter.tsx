"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
const Bads = [
  { Label: "Any", value: "0" },
  { Label: "1+", value: "1+" },
  { Label: "1.5+", value: "1.5+" },
  { Label: "2+", value: "2+" },
  { Label: "2.5+", value: "2.5+" },
  { Label: "3+", value: "3+" },
  { Label: "3.5+", value: "3.5+" },
  { Label: "4+", value: "4+" },
];

function Bathsfilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const handleSuggestedSearch = (value: string, typeParmes: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value != "0") {
      params.set(typeParmes, value);
    } else {
      params.delete(typeParmes);
    }
    replace(`/listing?${params.toString()}`);
  };
  const isactiv = params.get("Baths") || "0";
  return (
    <div>
      <Menubar className="py-3 rounded-xl h-12">
        <MenubarMenu>
          <MenubarTrigger className="px-6 cursor-pointer ">
            Baths
          </MenubarTrigger>
          <MenubarContent className=" flex items-center w-full gap-1 pr-2 justify-between">
            {Bads.map((item) => {
              const isSelected = item.value == isactiv;
              return (
                <Button
                  key={item.Label}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSuggestedSearch(item.value, "Baths")}
                  className={`flex items-center gap-1 cursor-pointer  transition-all duration-300  font-medium ${
                    isSelected
                      ? "bg-black dark:bg-white dark:text-black text-white shadow-sm   border border-gray-200 dark:border-gray-700"
                      : "hover:bg-gray-200 g-card text-card-foreground  dark:text-white"
                  }`}
                >
                  {item.Label}
                </Button>
              );
            })}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default Bathsfilter;
