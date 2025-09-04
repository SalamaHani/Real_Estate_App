import Continer from "@/components/global/Continer";
import { PaginationListing } from "@/components/global/Pgenation";
import GridListingS from "@/components/listing/GridListingS";
import Filter from "@/components/sersh/filter";
import { FetshSershListoning } from "@/utils/actions";
import React from "react";
type ListingsPageProps = {
  searchParams: {
    Page?: string;
    Minimam?: number;
    Maximam?: number;
    Bads?: string;
    Baths?: string;
    status?: string;
    listing_type?: string;
    city?: string;
    address?: string;
    limit?: string;
  };
};
async function page({ searchParams }: ListingsPageProps) {
  const Page = parseInt(searchParams.Page ?? "1");
  const Minimam = searchParams?.Minimam
    ? Number(searchParams.Minimam)
    : undefined;
  const Maximam = searchParams.Maximam
    ? Number(searchParams.Maximam)
    : undefined;
  // Build params for DB
  const data = await FetshSershListoning({
    Page,
    Minimam,
    Maximam,
    Bads: searchParams.Bads,
    Baths: searchParams.Baths,
    status: searchParams.status,
    listing_type: searchParams.listing_type,
    city: searchParams.city,
    address: searchParams.address,
  });
  console.log(data.listings);

  return (
    <div>
      <Filter />
      <div className="mt-60 mb-20">
        <Continer>
          <GridListingS listing={data.listings} />
        </Continer>
        {/* <PaginationListing
          Page={Page}
          pathe="listings"
          metadata={data.metadata}
        /> */}
      </div>
    </div>
  );
}

export default page;
