import { Agent } from "@prisma/client";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
// import Imaglisting from "../listing/Imaglisting";

import Link from "next/link";
import { Card, CardContent, CardDescription } from "../ui/card";
import Imaglisting from "../listing/Imaglisting";

function CardAgent({ Agent }: { Agent: Agent }) {
  return (
    <Card className="flex-row overflow-hidden gap-1 pt-0 pb-0">
      <div className="w-full">
        <div className=" relative aspect-[18/10]">
          <Imaglisting src={Agent.photo ?? ""} alt={""} />
        </div>
      </div>
      <CardContent className="flex-col h-full p-3 justify-between">
        <div className=" flex flex-col h-full justify-between">
          <CardDescription>
            <div className="grow">
              <h3 className="font-medium text-gray-800 dark:text-neutral-200">
                {Agent.full_name}
              </h3>
              <p className="text-xs  text-gray-500 dark:text-neutral-500">
                {Agent.brokerage_name}
              </p>
            </div>
            <p className="mt-3 text-gray-500 dark:text-neutral-500">
              {Agent.franchise_name}
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
