import React from "react";
import Imaglisting from "../listing/Imaglisting";
import CardDilogAgent from "./CardDilogAgent";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { ListingAgents } from "@prisma/client";

// Define Agent type based on database schema

function AgentHero({ Agent }: { Agent?: ListingAgents | null }) {
  return (
    <div className="w-full flex flex-wrap md:flex-nowrap  justify-between gap-6 mt-20 mb-20 ">
      <div className="w-full md:w-[40%] cursor-pointer">
        <div className="relative aspect-8/10">
          <Imaglisting src={Agent?.photo ?? ""} alt={""} />
        </div>
      </div>
      <div className="w-full md:w-[60%] p-5 flex flex-col justify-between">
        <div className="flex  items-center justify-between">
          <div>
            <h1 className="font-medium italic text-4xl text-gray-800 dark:text-neutral-200">
              {Agent?.full_name}
            </h1>
            <p className="text-xl mt-1 text-gray-500 dark:text-neutral-500">
              {Agent?.brokerage_name}
            </p>
          </div>
          <div>
            <CardDilogAgent Agent={Agent} />
          </div>
        </div>
        <div>
          <h4 className="font-medium italic text-xl">Office Agent:</h4>
          <p className="text-lg mt-1 text-gray-500 dark:text-neutral-500">
            {Agent?.office_name}
          </p>
          <p className="text-lg mt-1 text-gray-500 dark:text-neutral-500">
            {Agent?.office_city}
          </p>
          <p className="text-lg mt-1 text-gray-500 dark:text-neutral-500">
            {Agent?.broker_email}
          </p>
          <p className="text-lg mt-1 text-gray-500 dark:text-neutral-500">
            {Agent?.office_line_number}
          </p>
        </div>
        <p className="text-lg mt-1 italic text-gray-500 dark:text-neutral-500">
          Barrys roots in Northern Virginia run deep, influenced by a Top
          Producing real estate agent mother who instilled in him the keys to
          success in the business from an early age. His journey includes
          renovating and selling numerous homes, equipping him with valuable
          contracting expertise. This knowledge is a cornerstone of his service,
          enabling him to expertly assess the potential of each property for his
          clients. Motivated by the thrill of navigating the competitive real
          estate landscape, Barry is committed to securing outstanding deals for
          his clients. He believes in the power of detail a reflection of
          Barrington Groups dedication to transparent communication and
          personalized service.
        </p>
        <div className="mt-3 space-x-1">
          <Link
            className="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            href={Agent?.social_media?.facebook ?? ""}
          >
            <Facebook />
          </Link>
          <Link
            className="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            href={Agent?.social_media?.instagram ?? ""}
          >
            <Instagram />
          </Link>
          <Link
            className="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            href={Agent?.social_media?.linkedin ?? ""}
          >
            <Linkedin />
          </Link>
          <Link
            className="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            href={Agent?.social_media?.twitter ?? ""}
          >
            <Twitter />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AgentHero;
