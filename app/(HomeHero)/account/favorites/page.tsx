import ListingOfagent from "@/components/agents/ListingOfagent";
import Continer from "@/components/global/Continer";
import TitelSection from "@/components/global/TitelSection";
import { faveretlisting } from "@/utils/actions";
import React from "react";

async function page() {
  const fivaretlistinng = await faveretlisting();
  if (fivaretlistinng.length == 0)
    return <TitelSection text="you have no reviews yet" />;
  return (
    <Continer className="mt-20">
      <TitelSection text="Your Favorites Listing?" />
      <ListingOfagent listing={fivaretlistinng.map((item) => item.listing)} />
    </Continer>
  );
}

export default page;
