import React from "react";

import { CheckCircle, Clock, House, HousePlus, MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
import FavoriteToggleButton from "./FavaretToggel";
import Imaglisting from "./Imaglisting";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

import NoreseltListing from "./NoreseltListing";
import { ScrollArea } from "../ui/scroll-area";
import Continer from "../global/Continer";
import Cardprice from "./Cardprice";
import { Listing } from "@/utils/Tayp";

function GridListingS({
  listing,
  hiden_map,
}: {
  listing: Listing[];
  hiden_map?: string;
}) {
  const getStatusConfig = (statusName: string) => {
    return statuse.find((s) => s.states === statusName) || statuse[3];
  };
  const statuse = [
    {
      id: 1,
      states: "Active",
      color:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      icon: CheckCircle,
      description: "Order successfully Activ",
    },
    {
      id: 2,
      states: "Coming Soon",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      icon: HousePlus,
      description: "Order is in transit",
    },
    {
      id: 3,
      states: "Contingent",
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      icon: House,
      description: "Order is being prepared",
    },
    {
      id: 4,
      states: "pending",
      color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      icon: Clock,
      description: "Order awaiting confirmation",
    },
  ];
  if (listing.length == 0) {
    return (
      <div className="">
        <NoreseltListing />
      </div>
    );
  }

  return (
    <ScrollArea
      className={`${hiden_map == "true" ? "h-107" : "h-102"} w-full p-5  max-h-110 overflow-y-auto pb-1
                `}
    >
      <Continer>
        <div
          className={`grid grid-cols-1 ${hiden_map == "true" ? "sm:grid-cols-2 lg:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} gap-3 sm:gap-4 md:gap-5`}
        >
          {listing.map((listing) => {
            const {
              price,
              photos,
              location,
              bathrooms,
              bedrooms,
              living_area,
              listing_status,
            } = listing;
            const statusConfig = getStatusConfig(listing_status);
            const StatusIcon = statusConfig.icon;
            const listingId = listing.id;
            return (
              <div key={listingId}>
                <article className="group relative h-full">
                  <Card className="overflow-hidden pt-0 h-full flex flex-col">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {photos.map((src: string, i: number) => (
                          <CarouselItem
                            key={i}
                            className="relative aspect-16/10"
                          >
                            {photos.length == 1 ? null : (
                              <CarouselPrevious className="left-4 sm:left-8" />
                            )}
                            <Link href={`/listing/${listingId}`}>
                              <Imaglisting src={src} alt={src} />
                            </Link>
                            {photos.length == 1 ? null : (
                              <CarouselNext className="right-4" />
                            )}
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                    <CardHeader className="space-y-2 shrink-0">
                      <Cardprice price={price ?? 0} />
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">
                          {location?.county} , {location?.city}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 grow">
                      <div className="flex flex-col justify-between">
                        <CardDescription>
                          <ul className="flex gap-2 sm:gap-3 md:gap-4 mb-0">
                            <li className="text-center">
                              <span className="block font-bold text-base sm:text-lg">
                                {living_area}m
                              </span>
                              <span className="block text-xs sm:text-sm text-muted-foreground">
                                Sq Ft
                              </span>
                            </li>
                            <li className="text-center">
                              <span className="block font-bold text-base sm:text-lg">
                                {bedrooms}
                              </span>
                              <span className="block text-xs sm:text-sm text-muted-foreground">
                                Beds
                              </span>
                            </li>
                            <li className="text-center">
                              <span className="block font-bold text-base sm:text-lg">
                                {bathrooms}
                              </span>
                              <span className="block text-xs sm:text-sm text-muted-foreground">
                                Baths
                              </span>
                            </li>
                          </ul>
                        </CardDescription>
                      </div>
                      {price ? (
                        <Badge
                          className={`${statusConfig.color} flex items-center gap-1 w-fit`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {listing_status.charAt(0).toUpperCase() +
                            listing_status.slice(1)}
                        </Badge>
                      ) : null}
                    </CardContent>
                  </Card>
                  <div className="absolute top-8 right-12 z-5">
                    <FavoriteToggleButton listingId={listingId} />
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </Continer>
    </ScrollArea>
  );
}

export default GridListingS;
