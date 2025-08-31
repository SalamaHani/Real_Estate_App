import Filter from "@/components/sersh/filter";
import React from "react";
type ProductsPageProps = {
  searchParams: Promise<{
    layout?: string;
    Parmes?: string;
    Page?: string;
  }>;
};
function page({ searchParams }: ProductsPageProps) {
  return (
    <div>
      <Filter />
      <h1>listing</h1>
    </div>
  );
}

export default page;
