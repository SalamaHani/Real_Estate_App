
import ContenerLsting from "@/components/listing/ContenerLsting";
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
    Status?: string;
    listing_type?: string;
    city?: string;
    address?: string;
    limit?: string;
    Map?: string;
  };
};
async function page({ searchParams }: ListingsPageProps) {
  const Page = parseInt(searchParams.Page ?? "1");
  const Map = searchParams?.Map;
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
    Status: searchParams.Status,
    listing_type: searchParams.listing_type,
    city: searchParams.city,
    address: searchParams.address,
  });
  return (
    <div className="h-[100vh] overflow-y-hidden">
      <Filter />
      <ContenerLsting hidenmap={Map} data={data} Page={Page} />
    </div>
  );
}

export default page;
