import Continer from "@/components/global/Continer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
    return (
        <div className="h-[100vh] overflow-y-hidden">
            <FilterNavSkeleton />

            <div
                className={` mt-50  w-[100%] overflow-hidden  grid grid-cols-1 sm:grid-cols-1 gap-2 `}
            >
                <div>
                    <div>
                        <article className="group relative">
                            <Continer className={`grid   sm:grid-cols-4 grid-cols-1  gap-2 `}>
                                <Cardloding />
                                <Cardloding />
                                <Cardloding />
                                <Cardloding />
                            </Continer>
                        </article>
                    </div>
                </div>
                <PaginationSkeleton />
            </div>
        </div>
    );
}

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

// components/FilterNavSkeleton.tsx

export const FilterNavSkeleton = () => {
    return (
        <nav className="top-23  left-0 w-full z-50 bg-gray-100 dark:bg-neutral-900 transition-all duration-500  shadow-md fixed">
            <Continer className="flex mx-auto max-w-7xl xl:max-w-8xl px-8 justify-center md:flex-row  md:items-center  py-3 gap-1">
                <Skeleton className="h-8 w-40 rounded-md" />
                <Skeleton className="h-8 w-110 rounded-md" />
                <Skeleton className="h-8 w-28 rounded-md" />
                <Skeleton className="h-8 w-28 rounded-md" />
                <Skeleton className="h-8 w-28 rounded-md" />
                <Skeleton className="h-8 w-40 rounded-md" />
                <Skeleton className="h-8 w-28 rounded-md" />
                <Skeleton className="h-8 w-15 rounded-md" />
            </Continer>
        </nav>
    );
};

// components/PaginationSkeleton.tsx

export const PaginationSkeleton = () => {
    return (
        <div className="mt-15 flex justify-center pb-15">
            <nav aria-label="Pagination loading">
                <div className="inline-flex -space-x-px text-base h-10">
                    {/* Prev button placeholder */}
                    <Skeleton className="h-6 w-80 rounded-l-lg" />
                </div>
            </nav>
        </div>
    );
};


export default loading;