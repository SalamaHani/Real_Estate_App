"use client";

import Continer from "@/components/global/Continer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
function loading() {
  return (
    <Continer>
      <div className="mt-15 mb-5">
        <div className=" mb-10 lg:mb-14 flex-col  justify-center  items-center">
          <Skeleton className="w-40 h-5   " />
          <Skeleton className="w-70 h-3   " />
        </div>
      </div>
      <div className="w-full flex justify-center items-center flex-wrap gap-5 ">
        <CaredButtonloding />
        <CaredButtonloding />
        <CaredButtonloding />
        <CaredButtonloding />
        <CaredButtonloding />
      </div>
    </Continer>
  );
}
const CaredButtonloding = () => {
  return (
    <Card className="flex-row overflow-hidden items-center justify-center gap-1  px-20 py-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <CardContent>
        <div className="flex flex-col h-full w-full  justify-center items-center">
          <Skeleton className="w-10 h-10 rounded-full   " />
          <Skeleton className="w-30 h-3    " />
        </div>
      </CardContent>
    </Card>
  );
};

export default loading;
