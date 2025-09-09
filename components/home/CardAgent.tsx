import { Agent } from "@prisma/client";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

import Link from "next/link";
import { Card, CardContent, CardDescription } from "../ui/card";
import Imaglisting from "../listing/Imaglisting";

function CardAgent({ Agent }: { Agent: Agent }) {
  return (
    <Card className="flex-row overflow-hidden gap-1  pt-0 pb-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <Link
        href={`/agents/${Agent.first_name}`}
        className="w-[40%] cursor-pointer"
      >
        <div className="relative aspect-[4/4] ">
          <Imaglisting src={Agent.photo ?? ""} alt={""} />
        </div>
      </Link>
      <CardContent className="flex-col h-full p-3 justify-between">
        <div className=" flex flex-col h-full justify-between">
          <CardDescription>
            <div className="grow">
              <h2 className="font-medium text-gray-800 dark:text-neutral-200">
                {Agent.full_name}
              </h2>
              <p className="text-xs mt-1 text-gray-500 dark:text-neutral-500">
                {Agent.brokerage_name}
              </p>
            </div>
            <p className="mt-3 text-gray-500 dark:text-neutral-500">
              {Agent.franchise_name}
            </p>
            <p className="mt-4 text-md text-gray-600 dark:text-neutral-500">
              {Agent.office_name}
            </p>
            <p className="mt-4 text-md text-gray-600 dark:text-neutral-500">
              {Agent.broker_phone}
            </p>
          </CardDescription>
        </div>
        <div className="mt-3 space-x-1">
          <Link
            className="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            href={Agent.social_media?.facebook ?? ""}
          >
            <Facebook />
          </Link>
          <Link
            className="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            href={Agent.social_media?.instagram ?? ""}
          >
            <Instagram />
          </Link>
          <Link
            className="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            href={Agent.social_media?.linkedin ?? ""}
          >
            <Linkedin />
          </Link>
          <Link
            className="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            href={Agent.social_media?.twitter ?? ""}
          >
            <Twitter />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardAgent;
