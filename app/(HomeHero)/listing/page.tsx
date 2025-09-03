import Filter from "@/components/sersh/filter";
import React from "react";
type ProductsPageProps = {
  searchParams: Promise<{
    layout?: string;
    address?: string;
    city?: string;
    Page?: string;
  }>;
};
function page({ searchParams }: ProductsPageProps) {
  return (
    <div>
      <Filter />
    </div>
  );
}

export default page;
