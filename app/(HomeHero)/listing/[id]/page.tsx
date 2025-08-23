import Continer from "@/components/global/Continer";
import TitelSection from "@/components/global/TitelSection";
import React from "react";
type ProductEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};
async function page({ params }: ProductEditPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <section>
      <Continer>
        <TitelSection text="fevevervcrevrtvrtvtrfv" />
        <div>{id}</div>
      </Continer>
    </section>
  );
}

export default page;
