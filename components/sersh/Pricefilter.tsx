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
      <Menubar className="py-3 rounded-xl h-12">
        <MenubarMenu>
          <MenubarTrigger className="px-6 py-3 rounded-xl  h-12">
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
