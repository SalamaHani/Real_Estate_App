import React from "react";
import Continer from "../global/Continer";
import Sershinout from "./Sershinout";

function Filter() {
  return (
    <nav
      className={`top-30 left-0 w-full z-50 transition-all duration-500 bg-white dark:bg-black shadow-md fixed`}
    >
      <Continer className="flex justify-between md:flex-row md:justify-between md:items-center flex-wrap py-5 gap-4">
        <Sershinout />
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
