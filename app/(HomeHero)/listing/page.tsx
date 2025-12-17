import ContenerLsting from "@/components/listing/ContenerLsting";
import Filter from "@/components/sersh/filter";
import { FetshSershListoning } from "@/utils/actions";
import React from "react";
// type ListingsPageProps = {
//   searchParams: {
//     Page?: string;
//     Minimam?: number;
//     Maximam?: number;
//     Bads?: string;
//     Baths?: string;
//     Status?: string;
//     listing_type?: string;
//     city?: string;
//     address?: string;
//     limit?: string;
//     Map?: string;
//   };
// };
interface ListingsPageProps {
  // Use a specific type instead of 'any' for better type safety
  searchParams: // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Promise<{ [key: string]: any | any[] | undefined }> | undefined;
  // If you also use 'params', it needs to be a Promise too
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Promise<{ [key: string]: any | any[] }>;
}

async function page({ searchParams }: ListingsPageProps) {
  const resolvedSearchParams = await searchParams;
  const Page = parseInt(resolvedSearchParams?.Page ?? "1");
  const Map = resolvedSearchParams?.Map;
  const Minimam = resolvedSearchParams?.Minimam
    ? Number(resolvedSearchParams.Minimam)
    : undefined;
  const Maximam = resolvedSearchParams?.Maximam
    ? Number(resolvedSearchParams.Maximam)
    : undefined;
  // Build params for DB
  const data = await FetshSershListoning({
    Page,
    Minimam,
    Maximam,
    Bads: resolvedSearchParams?.Bads,
    Baths: resolvedSearchParams?.Baths,
    Status: resolvedSearchParams?.Status,
    listing_type: resolvedSearchParams?.listing_type,
    city: resolvedSearchParams?.city,
    address: resolvedSearchParams?.address,
  });
  return (
    <div className="h-[100vh] overflow-y-hidden">
      <Filter />
      <ContenerLsting hidenmap={Map} data={data} Page={Page} />
    </div>
  );
}

export default page;
