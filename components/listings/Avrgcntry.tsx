import React from "react";
import HTMLContent from "../global/HtmalCont";
import { Card } from "../ui/card";
import { BadgeDollarSign, Car, Clock4, House } from "lucide-react";
import { Areacuntry } from "@prisma/client";
function Avrgcntry({ cuntryprparty }: { cuntryprparty: Areacuntry | null }) {
  return (
    <div className=" px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-36 sm:h-56 flex flex-col justify-center border  rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
          <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
            <Clock4 className=" text-black dark:text-black" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Median Age
          </h3>
          <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
            <HTMLContent Cont={cuntryprparty?.MedianAge ?? 0} />
            yers
          </div>
        </Card>
        <Card className="h-36 sm:h-56 flex flex-col justify-center border  rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
          <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
            <Car className=" text-black dark:text-black" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Avg Work Commute
          </h3>
          <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
            <HTMLContent Cont={cuntryprparty?.AvgWorkCommute ?? 0} />
            mins
          </div>
        </Card>
        <Card className="h-36 sm:h-56 flex flex-col justify-center border  rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
          <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
            <BadgeDollarSign className=" text-black dark:text-black" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Median Area Income
          </h3>
          <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
            <HTMLContent Cont={cuntryprparty?.MedianAreaIncome ?? 0} />$
          </div>
        </Card>
        <Card className="h-36 sm:h-56 flex flex-col justify-center border  rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
          <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
            <House className=" text-black dark:text-black" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Median Sale Price
          </h3>
          <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
            <HTMLContent Cont={cuntryprparty?.MedianSalePrice ?? 0} />$
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Avrgcntry;
