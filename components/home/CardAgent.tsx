import { Agent } from "@prisma/client";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
// import Imaglisting from "../listing/Imaglisting";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

function CardAgent({ Agent }: { Agent: Agent }) {
  return (
    <div className="flex flex-col rounded-xl p-4 md:p-6 bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-700">
      <div className="flex items-center gap-x-4">
        <Avatar className="w-17 h-17">
          <AvatarImage src={Agent?.photo ?? ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grow">
          <h3 className="font-medium text-gray-800 dark:text-neutral-200">
            {Agent.full_name}
          </h3>
          <p className="text-xs  text-gray-500 dark:text-neutral-500">
            {Agent.brokerage_name}
          </p>
        </div>
      </div>

      <p className="mt-3 text-gray-500 dark:text-neutral-500">
        {Agent.franchise_name}
      </p>

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
    </div>
  );
}

export default CardAgent;
