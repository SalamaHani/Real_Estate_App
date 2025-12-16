import { listing } from "@prisma/client";
import ShowMap from "../sersh/ShowMap";
import GridListingS from "./GridListingS";
import PaginationListing from "../global/Pgenation";
import MapFiltring from "./MapFiltring";

type DataListing = {
  listings: listing[];
  metadata: {
    total: number;
    totalPage: number;
    Page: number;
  };
};

function ContenerLsting({
  data,
  Page,
  hidenmap,
}: {
  data: DataListing;
  Page: number;
  hidenmap: string | undefined;
}) {
  console.log(hidenmap);
  return (
    <div
      className={` mt-50 ${hidenmap == "true" ? "w-[50%]" : "w-[100%]"} overflow-hidden  grid grid-cols-1 sm:grid-cols-1 gap-2 `}
    >
      <ShowMap />
      <div>
        <GridListingS hiden_map={hidenmap ?? ''} listing={data.listings} />
        <div>
          <PaginationListing
            Page={Page}
            pathe="listing"
            metadata={data.metadata}
          />
        </div>
      </div>
      <div
        className={` ${hidenmap == "true" ? "fixed w-[50%]  block" : "  hidden"} h-auto  right-0    top-39  scale-z-95 `}
      >
        <MapFiltring listing={data.listings} />
      </div>
    </div>
  );
}

export default ContenerLsting;
