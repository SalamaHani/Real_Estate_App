import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function LodingReadMore() {
  return (
    <div className="grid md:grid-cols-1 gap-8 mt-4">
      <ReviewMordLoadingCard />
    </div>
  );
}

export default LodingReadMore;
const ReviewMordLoadingCard = () => {
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
