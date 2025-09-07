"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ComboboxPrice } from "./PriceStauts";
function Pricefilter() {
  return (
    <div>
      <Menubar className=" rounded-xl h-12">
        <MenubarMenu>
          <MenubarTrigger className="px-6 cursor-pointer   ">
            Price
          </MenubarTrigger>
          <MenubarContent className=" flex items-center w-full gap-1 pr-2 justify-between">
            <ComboboxPrice type={"Minimam"} />
            <ComboboxPrice type={"Maximam"} />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default Pricefilter;
