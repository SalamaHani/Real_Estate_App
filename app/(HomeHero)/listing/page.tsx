import Continer from "@/components/global/Continer";
import PaginationListing from "@/components/global/Pgenation";
import GridListingS from "@/components/listing/GridListingS";
import MapFiltring from "@/components/listing/MapFiltring";
import Filter from "@/components/sersh/filter";
import { Button } from "@/components/ui/button";
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
  const locationmap = {
    lat: -75.397666,
    lng: 40.654583,
  };
  return (
    <div className="h-[100vh] overflow-y-hidden">
      <Filter />

      <div className=" mt-50 grid grid-cols-1 sm:grid-cols-1 gap-2">
        <div>
          <GridListingS listing={data.listings} />
          <div>
            {data.listings.length == 0 ? null : (
              <PaginationListing
                Page={Page}
                pathe="listing"
                metadata={data.metadata}
              />
            )}
          </div>
        </div>
        {/* <div className="w-full h-190 p-5 rounded-md border">
            <MapFiltring location={locationmap} city="los Anglo" />
          </div> */}
      </div>
    </div>
  );
}

export default page;
