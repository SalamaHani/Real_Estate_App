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
    <div >
      <h1>listing</h1>
    </div>
  );
}

export default page;
