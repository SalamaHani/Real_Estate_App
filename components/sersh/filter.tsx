import React from "react";
import Continer from "../global/Continer";
import Sershinout from "./Sershinout";
import SallandRell from "./SallandRell";
import Pricefilter from "./Pricefilter";
import Bedasfilter from "./Bedasfilter";
import Bathsfilter from "./Badthfilter";
import Activfilter from "./ActivFilter";
import ButtonReset from "./ButtonReset";

function Filter() {
  return (
    <nav
      className={`top-23 left-0 w-full z-50 bg-gray-100 transition-all duration-500  shadow-md fixed`}
    >
      <Continer className="flex  md:flex-row  md:items-center  py-3 gap-2">
        <SallandRell />
        <Sershinout />
        <Pricefilter />
        <Bedasfilter />
        <Bathsfilter />
        <Activfilter />
        <ButtonReset />
      </Continer>
    </nav>
  );
}

export default Filter;
