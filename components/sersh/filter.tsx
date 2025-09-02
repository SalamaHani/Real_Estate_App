import React from "react";
import Continer from "../global/Continer";
import Sershinout from "./Sershinout";
import SallandRell from "./SallandRell";
import Pricefilter from "./Pricefilter";
import Bedasfilter from "./Bedasfilter";
import Bathsfilter from "./Badthfilter";
import Activfilter from "./ActivFilter";

function Filter() {
  return (
    <nav
      className={`top-25 left-0 w-full z-50 transition-all duration-500 bg-red-200 shadow-md fixed`}
    >
      <Continer className="flex  md:flex-row  md:items-center flex-wrap py-5 gap-3">
        <SallandRell />
        <Sershinout />
        <Pricefilter />
        <Bedasfilter />
        <Bathsfilter />
        <Activfilter />
        <div className=" flex gap-4 items-center  ">
          {/* <CartButton /> */}
          {/* <DarkMode />
            <LinksDropdown session={session} /> */}
        </div>
      </Continer>
    </nav>
  );
}

export default Filter;
