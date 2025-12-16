import { ListingAgents } from "@prisma/client";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

import Link from "next/link";
import { Card, CardContent, CardDescription } from "../ui/card";
import Imaglisting from "../listing/Imaglisting";

function CardAgent({ Agent }: { Agent: ListingAgents }) {
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
        <div className="mt-3 flex gap-2">
          <Link
            className="inline-flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-border bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 hover:scale-110 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
            href={Agent.social_media?.facebook ?? ""}
          >
            <Facebook className="w-4 h-4" />
          </Link>
          <Link
            className="inline-flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-border bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 hover:scale-110 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
            href={Agent.social_media?.instagram ?? ""}
          >
            <Instagram className="w-4 h-4" />
          </Link>
          <Link
            className="inline-flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-border bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 hover:scale-110 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
            href={Agent.social_media?.linkedin ?? ""}
          >
            <Linkedin className="w-4 h-4" />
          </Link>
          <Link
            className="inline-flex justify-center items-center size-9 text-sm font-semibold rounded-lg border border-border bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 hover:scale-110 focus:outline-hidden focus:ring-2 focus:ring-primary/50"
            href={Agent.social_media?.twitter ?? ""}
          >
            <Twitter className="w-4 h-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardAgent;
