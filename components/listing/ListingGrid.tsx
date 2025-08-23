"use client";
import Link from "next/link";
import React from "react";

import { Listing } from "@prisma/client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatCurrency } from "@/utils/format";
import { CheckCircle, Clock, House, HousePlus } from "lucide-react";
import { Badge } from "../ui/badge";

function ListingGrid({ listing }: { listing: Listing[] }) {
  const handelonerror = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/imges/notfoundimg.jpg";
    e.currentTarget.removeAttribute("srcset");
  };
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

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mt-10"
    >
      <CarouselContent>
        {listing.map((listing) => {
          const { price, photos, location, listing_status } = listing;
          const statusConfig = getStatusConfig(listing_status);
          const StatusIcon = statusConfig.icon;
          const productId = listing.id;
          return (
            <CarouselItem key={productId} className="md:basis-1/2 lg:basis-1/3">
              <article className="group relative ">
                <Card className=" overflow-hidden pt-0">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {photos.map((src, i) => (
                        <CarouselItem
                          key={i}
                          className="relative aspect-[16/10]"
                        >
                          {photos.length == 1 ? null : (
                            <CarouselPrevious className="left-8" />
                          )}
                          <Link href={`/listing/${productId}`}>
                            <Image
                              src={src}
                              alt={`${src} image ${i + 1}`}
                              fill
                              className="object-cover z-40"
                              sizes="(max-width:768px) 100vw, 600px"
                              onError={handelonerror}
                              priority={i === 0}
                            />
                          </Link>
                          {photos.length == 1 ? null : (
                            <CarouselNext className="right-4" />
                          )}
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-xl">
                      {formatCurrency(price)}
                    </CardTitle>
                    <CardDescription>{location?.county}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <CardDescription>
                      {location?.city}
                      {location?.street_address}
                    </CardDescription>
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
                <div className="absolute top-13 right-7 z-5">
                  {/* <FavoriteToggleButton productId={productId} /> */}
                </div>
              </article>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ListingGrid;
