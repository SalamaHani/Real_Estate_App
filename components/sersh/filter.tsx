"use client";
import React, { useState } from "react";
import Continer from "../global/Continer";
import Sershinout from "./Sershinout";
import SallandRell from "./SallandRell";
import Pricefilter from "./Pricefilter";
import Bedasfilter from "./Bedasfilter";
import Bathsfilter from "./Badthfilter";
import Activfilter from "./ActivFilter";
import ButtonReset from "./ButtonReset";
import { Savedfilter } from "./Savedfilter";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";

function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`top-23 left-0 w-full z-40 transition-all duration-500 shadow-md fixed`}
    >
      <Continer className="mx-auto max-w-8xl xl:max-w-8xl px-4 md:px-8">
        {/* Mobile Header with Toggle Button */}
        <div className="flex items-center justify-between py-3 lg:hidden">
          <div className="flex items-center gap-2 flex-1">
            <SallandRell />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2"
            aria-label="Toggle filters"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Dropdown Filters */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-150 pb-3" : "max-h-0"}`}
        >
          <div className="flex flex-col gap-2">
            <Sershinout />
            <div className="grid grid-cols-2 gap-2">
              <Pricefilter />
              <Bedasfilter />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Bathsfilter />
              <Activfilter />
            </div>
            <div className="flex gap-2">
              <Savedfilter />
              <ButtonReset />
            </div>
          </div>
        </div>

        {/* Desktop Horizontal Layout */}
        <div className="hidden lg:flex justify-center items-center py-3 gap-2 flex-wrap">
          <SallandRell />
          <Sershinout />
          <Pricefilter />
          <Bedasfilter />
          <Bathsfilter />
          <Activfilter />
          <Savedfilter />
          <ButtonReset />
        </div>
      </Continer>
    </nav>
  );
}

export default Filter;
