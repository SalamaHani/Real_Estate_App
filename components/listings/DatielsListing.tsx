

import React from "react";
import { CheckCircle, Clock, House, HousePlus } from "lucide-react";
import { Badge } from "../ui/badge";
import Cardprice from "../listing/Cardprice";
import { Listing } from "@/utils/Tayp";
function DatielsListing({ listungs }: { listungs: Listing | null }) {
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
  const statusConfig = getStatusConfig(listungs?.listing_status ?? "");
  const StatusIcon = statusConfig.icon;
  return (
    <div className="w-full mt-12 mx-auto  ">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">
            {listungs?.location?.street_address}
          </h2>
          <p className="text-gray-600">{listungs?.location?.city}</p>
          <ul className="flex gap-4 mt-5 mb-0">
            <li className="text-center">
              <span className="block font-bold text-xl">
                {listungs?.living_area}m
              </span>
              <span className="block text-lg text-gray-600">Sq Ft</span>
            </li>
            <li className="text-center">
              <span className="block font-bold text-xl">
                {listungs?.bedrooms}
              </span>
              <span className="block text-lg text-gray-600">Beds</span>
            </li>
            <li className="text-center">
              <span className="block font-bold text-xl">
                {listungs?.bathrooms}
              </span>
              <span className="block text-lg text-gray-600">Baths</span>
            </li>
          </ul>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold">
            <Cardprice price={listungs?.price ?? 0} />
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Est. Offices <br />
            <span className="font-semibold">
              ${listungs?.offices[0].office_name}
            </span>
          </p>
          <div className="mt-4 flex  justify-end">
            <Badge
              className={`${statusConfig.color} flex items-center gap-1 w-fit`}
            >
              <StatusIcon className="h-3 w-3" />
              {listungs?.listing_status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6  text-lg leading-relaxed">
        {listungs?.description}
      </div>
    </div>
  );
}

export default DatielsListing;
