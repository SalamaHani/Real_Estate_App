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
      <section className="grid md:grid-cols-2 gap-8 mt-4">
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

const ReviewLoadingCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="ml-4">
            <Skeleton className="w-[150px] h-2 mb-2" />
            <StarSkeleton />
            <Skeleton className="w-[200px] h-2 " />
          </div>
        </div>
        <CardContent className="ml-0 mt-3">
          <Skeleton className="w-[500px] h-1 mb-1 " />
          <Skeleton className="w-[500px] h-1 mb-1 " />
          <Skeleton className="w-[500px] h-1 " />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export function StarSkeleton() {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-3 w-3 rounded mb-2" />
      ))}
    </div>
  );
}

export default loading;
