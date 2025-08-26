import Continer from "@/components/global/Continer";
import FavoriteToggleButton from "@/components/listing/FavaretToggel";
import DatielsListing from "@/components/listings/DatielsListing";
import ImgesListingcur from "@/components/listings/ImgesListingcur";
import MapListing from "@/components/listings/MapListing";
import ShareButton from "@/components/listings/ShareButton";
import TitelListingt from "@/components/listings/TitelListingt";
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

  const locationmap = {
    lag: Number(listung?.location?.lng) || 38.9072,
    lat: Number(listung?.location?.lat) || -77.0369,
  };
  return (
    <section className="mt-12">
      <Continer>
        <TitelListingt name={listung?.mls_name ?? ""} />
        <ImgesListingcur photos={listung?.photos ?? undefined} />
        <div>
          <div className="flex justify-between mt-20 gap-x-8 items-center">
            <h1 className="capitalize text-2xl font-bold">
              Agent:{listung?.agents[0].full_name ?? ""}
            </h1>
            <div className="flex w-30 justify-around items-center gap-x-2">
              <FavoriteToggleButton listingId={id} />
              <ShareButton name={listung?.mls_name ?? ""} listingId={id} />
            </div>
          </div>
        </div>
        <DatielsListing listungs={listung} />
        <MapListing location={locationmap} />
      </Continer>
    </section>
  );
}

export default page;
