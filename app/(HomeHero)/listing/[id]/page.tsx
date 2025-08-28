import Continer from "@/components/global/Continer";
import ContactAgentForm from "@/components/listing/ContactAgentForm";
import FavoriteToggleButton from "@/components/listing/FavaretToggel";
import DatielsListing from "@/components/listings/DatielsListing";
import ImgesListingcur from "@/components/listings/ImgesListingcur";
import MapListing from "@/components/listings/MapListing";
import ShareButton from "@/components/listings/ShareButton";
import TitelListingt from "@/components/listings/TitelListingt";
import { Button } from "@/components/ui/button";
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
    lat: Number(listung?.location?.lat) || -77.0369,
    lng: Number(listung?.location?.lng) || 38.9072,
  };
  return (
    <section className="mt-12">
      <Continer>
        <TitelListingt name={listung?.mls_name ?? ""} />
        <ImgesListingcur photos={listung?.photos ?? undefined} />
        <div>
          <div className="flex mt-20 gap-x-8 items-center justify-between">
            <h1 className="capitalize text-2xl font-bold">
              Agent:{listung?.agents[0].full_name ?? ""}
            </h1>
            <div className="flex items-center gap-x-2">
              <div>
                <FavoriteToggleButton classname={true} listingId={id} />
              </div>
              <ShareButton name={listung?.mls_name ?? ""} listingId={id} />
              <ContactAgentForm
                listingId={listung?.id ?? ""}
                Agent={listung?.agents[0] ?? null}
              />
            </div>
          </div>
        </div>
        <DatielsListing listungs={listung} />
        <div className=" flex flex-wrap justify-between items-center gap-10 mb-20">
          <MapListing
            city={listung?.location?.city ?? ""}
            location={locationmap}
          />
          <div className="w-[100%] sm:w-[40%] h-[40vh] mt-30 flex flex-col justify-between ">
            <h1 className="text-3xl font-sans">{listung?.location?.county}</h1>
            <p className="text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus nesciunt iusto excepturi reprehenderit molestiae
              error distinctio minima architecto quasi aperiam ipsa expedita
              consequatur ducimus soluta omnis voluptatum incidunt, aliquam
              debitis.
            </p>
            <Button>{listung?.location?.street_address}</Button>
          </div>
        </div>
      </Continer>
    </section>
  );
}

export default page;
