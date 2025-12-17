import ListingOfagent from "@/components/agents/ListingOfagent";
import Continer from "@/components/global/Continer";
import TitelSection from "@/components/global/TitelSection";
import { faveretlisting } from "@/utils/actions";
import { Listing } from "@prisma/client";
import React from "react";
interface FavoriteItem {
  listing: Listing;
}
async function page() {
  const fivaretlistinng: FavoriteItem[] = await faveretlisting();

  if (fivaretlistinng.length == 0)
    return (
      <Continer className="mt-20">
        <TitelSection text="you have no reviews yet" />
      </Continer>
    );
  return (
    <Continer className="mt-20">
      <TitelSection text="Your Favorites Listing?" />
      <ListingOfagent
        listing={fivaretlistinng.map((item: FavoriteItem) => item.listing)}
      />
    </Continer>
  );
}

export default page;
