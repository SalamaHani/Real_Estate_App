import { PaginationListing } from "@/components/global/Pgenation";
import Filter from "@/components/sersh/filter";
import { FetshSershListoning } from "@/utils/actions";
import React from "react";
type ListingsPageProps = {
  searchParams: Promise<{
    Page?: string;
    Minimam?: number;
    Maximam?: number;
    Bads?: string;
    Baths?: string;
    status?: string;
    listing_type?: string;
    city?: string;
    address?: string;
    limit?: number;
  }>;
};
async function page({ searchParams }: ListingsPageProps) {
  const parmes = await searchParams;
  const Page = parseInt(parmes.Page || "1");
  console.log(parmes, Page);
  const data = await FetshSershListoning({ Page });
  return (
    <div>
      <Filter />
      <div className="mt-100">
        <PaginationListing
          Page={Page}
          pathe="listings"
          metadata={data.metadata}
        />
      </div>
    </div>
  );
}

export default page;
