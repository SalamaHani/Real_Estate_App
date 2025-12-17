import React from "react";
import { listing } from "@prisma/client";
import { CheckCircle, Clock, House, HousePlus, MapPin } from "lucide-react";
import { Badge } from "../ui/badge";
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
import Imaglisting from "../listing/Imaglisting";
import Cardprice from "../listing/Cardprice";
import FavoriteToggleButton from "../listing/FavaretToggel";

function ListingOfagent({ listing }: { listing: listing }) {
  const getStatusConfig = (statusName: string) => {
    return statuse.find((s) => s.states === statusName) || statuse[3];
  };
  const {
    price,
    photos,
    location,
    bathrooms,
    bedrooms,
    living_area,
    listing_status,
  } = listing;
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
  const statusConfig = getStatusConfig(listing_status);
  const StatusIcon = statusConfig.icon;
  const listingId = listing.id;

  return (
    <div className={`grid sm:grid-cols-4 grid-cols-1  gap-2 mt-10 mb-10 `}>
      <div>
        <article className="group relative ">
          <Card className=" overflow-hidden pt-0">
            <Carousel className="w-full">
              <CarouselContent>
                {photos.map((src, i) => (
                  <CarouselItem key={i} className="relative aspect-[16/10]">
                    {photos.length == 1 ? null : (
                      <CarouselPrevious className="left-8" />
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
            <CardHeader className="space-y-2">
              <Cardprice price={price ?? 0} />
              <CardDescription className="flex ">
                <MapPin className="h-3 w-3 mt-1" />
                {location?.county} , {location?.city}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className=" flex flex-col justify-between">
                <CardDescription>
                  <ul className="flex gap-4 mb-0">
                    <li className="text-center">
                      <span className="block font-bold text-lg">
                        {living_area}m
                      </span>
                      <span className="block text-sm text-gray-600">Sq Ft</span>
                    </li>
                    <li className="text-center">
                      <span className="block font-bold text-lg">
                        {bedrooms}
                      </span>
                      <span className="block text-sm text-gray-600">Beds</span>
                    </li>
                    <li className="text-center">
                      <span className="block font-bold text-lg">
                        {bathrooms}
                      </span>
                      <span className="block text-sm text-gray-600">Baths</span>
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
    </div>
  );
}

export default ListingOfagent;
