import Continer from "@/components/global/Continer";
import TitelSection from "@/components/global/TitelSection";
import ImgesListingcur from "@/components/listings/ImgesListingcur";
import { fetchlistingById } from "@/utils/actions";
import React from "react";
type ProductEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};
async function page({ params }: ProductEditPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const listung = await fetchlistingById({ id });
  // const {photos,name} = listung
  return (
    <section>
      <Continer>
        <TitelSection text="fevevervcrevrtvrtvtrfv" />
        <ImgesListingcur photos={listung?.photos ?? undefined} />
        <div>{id}</div>
      </Continer>
    </section>
  );
}

export default page;
