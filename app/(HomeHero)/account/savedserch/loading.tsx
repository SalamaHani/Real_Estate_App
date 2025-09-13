"use client";

import Continer from "@/components/global/Continer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <Continer className="mt-20 mb-10">
      <Skeleton className="w-60 h-3 mb-20  " />
      <Separator />
      <section className="grid md:grid-cols-2 gap-8 mt-10">
        <ReviewLoadingCard />
        <ReviewLoadingCard />
        <ReviewLoadingCard />
        <ReviewLoadingCard />
        <ReviewLoadingCard />
        <ReviewLoadingCard />
      </section>
    </Continer>
  );
}

export const ReviewLoadingCard = () => {
  return (
    <Card>
      <CardHeader className="w-full">
        <div className=" flex items-center w-full  justify-between">
          <Skeleton className="w-20 h-3   " />
          <Skeleton className="w-5 h-5   rounded-full " />
        </div>
      </CardHeader>
      <CardContent className="ml-0 mt-3">
        <div className="flex flex-col ">
          <div className="">
            <div className=" flex ">
              <Skeleton className="w-30 h-3   " />
            </div>
          </div>
          <div className=" mb-2 mt-2 flex ">
            <Skeleton className="w-30 h-3   " />
          </div>
        </div>
        <div className=" flex items-center">
          <div className="flex  flex-wrap w-full mb-3 mt-3 gap-1 justify-start space-x-1 ">
            <Skeleton className="w-10 h-3  rounded-md " />
            <Skeleton className="w-5 h-3  rounded-md " />
            <Skeleton className="w-8 h-3  rounded-md " />
            <Skeleton className="w-5 h-3  rounded-md " />
          </div>
        </div>
        <div className=" w-full mb-3 mt-3 flex justify-between ">
          <Skeleton className="w-40 h-2   " />
          <Skeleton className="w-30 h-4  rounded-md " />
        </div>
      </CardContent>
    </Card>
  );
};

export default loading;
