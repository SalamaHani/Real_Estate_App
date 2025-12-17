/* eslint-disable @typescript-eslint/no-explicit-any */
import ListingOfagent from "@/components/agents/ListingOfagent";
import Continer from "@/components/global/Continer";
import TitelSection from "@/components/global/TitelSection";
import { faveretlisting } from "@/utils/actions";
import React from "react";
async function page() {
  const fivaretlistinng = await faveretlisting();

  if (fivaretlistinng.length == 0)
    return (
      <Continer className="mt-20">
        <TitelSection text="you have no reviews yet" />
      </Continer>
    );
  return (
    <Continer className="mt-20">
      <TitelSection text="Your Favorites Listing?" />
      {fivaretlistinng.map((item: any) => (
        <ListingOfagent key={item.id} listing={item.listing} />
      ))}
    </Continer>
  );
}

export default page;
