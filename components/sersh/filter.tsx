import React from "react";
import Continer from "../global/Continer";
import Sershinout from "./Sershinout";
import SallandRell from "./SallandRell";
import Pricefilter from "./Pricefilter";
import Bedasfilter from "./Bedasfilter";
import Bathsfilter from "./Badthfilter";
import Activfilter from "./ActivFilter";
import ButtonReset from "./ButtonReset";
import { Savedfilter } from "./Savedfilter";

function Filter() {
  return (
    <nav
      className={`top-23  left-0 w-full z-50 bg-gray-100 dark:bg-neutral-900 transition-all duration-500  shadow-md fixed`}
    >
      <Continer className="flex mx-auto max-w-7xl xl:max-w-8xl px-8 justify-center md:flex-row  md:items-center  py-3 gap-1">
        <SallandRell />
        <Sershinout />
        <Pricefilter />
        <Bedasfilter />
        <Bathsfilter />
        <Activfilter />
        <Savedfilter />
        <ButtonReset />
      </Continer>
    </nav>
  );
}

export default Filter;
