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
      <section className="mt-10">
        <article className="group relative">
          <Continer className={`grid  sm:grid-cols-4 grid-cols-1  gap-2 `}>
            <Cardloding />
            <Cardloding />
            <Cardloding />
            <Cardloding />
          </Continer>
        </article>
      </section>
    </Continer>
  );
}
export default loading;
export const Cardloding = () => {
  return (
    <article className="group relative ">
      <Card className="overflow-hidden pt-0">
        <Skeleton className="w-full aspect-[16/10]" />
        <CardHeader className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-2 w-48" />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex flex-col  justify-between">
            <Skeleton className="h-3 w-30 mb-1" />
            <Skeleton className="h-2 w-35 mb-1" />
          </div>
          <Skeleton className="h-4 w-20 rounded-full" />
        </CardContent>
      </Card>
      <div className="absolute top-4 right-4 z-5">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </article>
  );
};
