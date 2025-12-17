import {
  Castle,
  Hospital,
  Landmark,
  LandPlot,
  School,
  Store,
  University,
  Users,
} from "lucide-react";
import React from "react";
import HTMLContent from "../global/HtmalCont";
import { Card } from "../ui/card";
import TitelSection from "../global/TitelSection";
import { Areacuntry } from "@/utils/Tayp";
function Contatrycont({ cuntryprparty }: { cuntryprparty: Areacuntry | null }) {
  return (
    <div className="pb-10 pt-10">
      <TitelSection text={`${cuntryprparty?.name} Schools & Education`} />
      <div className="max-w-[85rem] px-4  sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Card className="h-46  sm:h-56 flex flex-col justify-center border   rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
            <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
              <LandPlot className=" text-black dark:text-black" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Area Cuntry
            </h3>
            <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
              <HTMLContent Cont={cuntryprparty?.areaKm2 ?? 0} />
              Km
            </div>
          </Card>
          <Card className="h-46 sm:h-56 flex flex-col justify-center border  rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
            <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Users className=" text-black dark:text-black" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Population
            </h3>
            <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
              <HTMLContent Cont={cuntryprparty?.population ?? 0} />
            </div>
          </Card>
          <Card className="h-46 sm:h-56 flex flex-col justify-center border  rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
            <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Hospital className=" text-black dark:text-black" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Hospitals
            </h3>
            <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
              <HTMLContent Cont={cuntryprparty?.hospitalsCount ?? 0} />
            </div>
          </Card>
          <Card className="h-46 sm:h-56 flex flex-col justify-center border  rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
            <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
              <School className=" text-black dark:text-black" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Schools
            </h3>
            <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
              <HTMLContent Cont={cuntryprparty?.schoolsCount ?? 0} />
            </div>
          </Card>
          <Card className="h-46 sm:h-56 flex flex-col justify-center border  rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
            <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
              <University className=" text-black dark:text-black" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Universities
            </h3>
            <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
              <HTMLContent Cont={cuntryprparty?.Universities ?? 0} />
            </div>
          </Card>
          <Card className="h-46 sm:h-56 flex flex-col justify-center border  rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
            <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Landmark className=" text-black dark:text-black" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Mosques
            </h3>
            <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
              <HTMLContent Cont={cuntryprparty?.Mosques ?? 0} />
            </div>
          </Card>
          <Card className="h-46 sm:h-56 flex flex-col justify-center border  rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
            <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Castle className=" text-black dark:text-black" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Catholic
            </h3>
            <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
              <HTMLContent Cont={cuntryprparty?.Catholic ?? 0} />
            </div>
          </Card>
          <Card className="h-46 sm:h-56 flex flex-col justify-center border  rounded-xl text-center p-4 md:p-5 hover:shadow-lg transition-all  hover:scale-105 animate-in fade-in duration-500 group ">
            <div className="p-2 flex justify-center items-center size-12 mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-white rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Store className=" text-black dark:text-black" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
              Stores
            </h3>
            <div className="text-xl flex justify-center items-center font-bold text-gray-900 dark:text-gray-100 mb-1 tabular-nums">
              <HTMLContent Cont={cuntryprparty?.Stores ?? 0} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Contatrycont;
