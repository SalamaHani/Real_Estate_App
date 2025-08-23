import React from "react";
import TitelSection from "../global/TitelSection";
import { Feauterdlistings } from "@/utils/actions";
import ListingGrid from "../listing/ListingGrid";

async function Featured() {
  const Featurdlisting = await Feauterdlistings();
  console.log(Featurdlisting);
  return (
    <section className="mt-23">
      <TitelSection text={"Featured Listings Homes"} />
      <div>
        <ListingGrid listing={Featurdlisting} />
      </div>
    </section>
  );
}

export default Featured;
