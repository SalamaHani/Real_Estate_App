"use client";
import { SershQuerlisting } from "@/utils/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { listing } from "@prisma/client";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/utils/format";
type QueryResult = {
  listing: listing[];
  citys: string[];
};
type KeyValue = {
  key: string;
  value: string; // or number, depending on your data
};

function Sershinout() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isOpen, setIsopen] = useState(false);
  const [Parmes, setParmes] = useState("");
  const [ParmesAll, setPramsAll] = useState(
    Object.fromEntries(searchParams.entries())
  );
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [query, setQuery] = useState<QueryResult>({ listing: [], citys: [] });
  ///handelfetsh Query Servar Action
  const retunequer = async (val: string) => {
    const liset = await SershQuerlisting(val);
    return liset;
  };
  //handel filtring
  const handleSuggestedSearch = (value: string, typeParmes: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(typeParmes, value);
    } else {
      params.delete(typeParmes);
    }
    setIsopen(false);
    setParmes("");
    replace(`/listing?${params.toString()}`);
  };

  const handleSuggestedRemovSearch = (typeParmes: string) => {
    const params = new URLSearchParams(searchParams);
    if (typeParmes) {
      params.delete(typeParmes);
    }
    setParmes("");
    replace(`/listing?${params.toString()}`);
  };
  ///fetshQuery
  const handleSearch = useDebouncedCallback(async (value: string) => {
    const querey = await retunequer(value);
    setQuery(querey);
  }, 500);

  useEffect(() => {
    if (!searchParams.get("Parmes")) {
      setParmes("");
    }
    setPramsAll(Object.fromEntries(searchParams.entries()));
  }, [searchParams]);

  const prices = Object.entries(ParmesAll)
    .filter(([key]) => key === "Maximam" || key === "Minimam")
    .map(([key, value]) => ({ key, value }));

  const Morefilter = Object.entries(ParmesAll).slice(0, 2);
  const lenesthmotre = Object.entries(ParmesAll).length - Morefilter.length;
  Morefilter.push(["more", `${lenesthmotre}`]);

  let handelorice = false;
  const formatBedge = (key: string, value: string) => {
    if ((key == "Maximam" || key == "Minimam") && !handelorice) {
      handelorice = true;
      return handelprice(prices);
    }
    if ((key == "Maximam" || key == "Minimam") && handelorice) {
      return null;
    }
    if (key == "Bads" || key == "Baths") {
      if (value == "Studio") {
        return (
          <Badge
            className=" my-3 bg-primary text-white dark:text-black flex justify-between items-center"
            variant="outline"
          >
            {value}
            <button
              onMouseDown={() => handleSuggestedRemovSearch(key)}
              className=" flex justify-center items-center cursor-pointer w-3 h-3"
            >
              <X />
            </button>
          </Badge>
        );
      } else {
        return (
          <Badge
            className=" my-3 bg-primary text-white dark:text-black flex justify-between items-center"
            variant="outline"
          >
            {key}:{value}
            <button
              onMouseDown={() => handleSuggestedRemovSearch(key)}
              className=" flex justify-center items-center cursor-pointer w-3 h-3"
            >
              <X />
            </button>
          </Badge>
        );
      }
    }
    if (key == "more") {
      return (
        <Badge
          className=" my-3 bg-primary text-white dark:text-black flex justify-between items-center"
          variant="outline"
        >
          {key}:({value})
        </Badge>
      );
    }
    if (key == "Page" || key == "Map") {
      return null;
    }
    return (
      <Badge
        className=" my-3 bg-primary text-white dark:text-black flex justify-between items-center"
        variant="outline"
      >
        {value}
        <button
          onMouseDown={() => handleSuggestedRemovSearch(key)}
          className=" flex justify-center items-center cursor-pointer w-3 h-3"
        >
          <X />
        </button>
      </Badge>
    );
  };
  const handelprice = (arr: KeyValue[]) => {
    if (arr.length == 2) {
      return (
        <Badge
          className=" my-3 bg-primary text-white dark:text-black flex justify-between items-center"
          variant="outline"
        >
          Price:{" "}
          {formatPrice(arr.find((p) => p.key === "Minimam")?.value ?? "")} to{" "}
          {formatPrice(arr.find((p) => p.key === "Maximam")?.value ?? "")}
          <button
            onMouseDown={() => handleSuggestedRemovSearch("Maximam")}
            className=" flex justify-center items-center cursor-pointer w-3 h-3"
          >
            <X />
          </button>
        </Badge>
      );
    }
    if (arr.length == 1) {
      return (
        <>
          {arr.find((p) => p.key === "Minimam")?.key == "Minimam" ? (
            <Badge
              className=" my-3 bg-primary text-white dark:text-black flex justify-between items-center"
              variant="outline"
            >
              Price: ovar{" "}
              {formatPrice(arr.find((p) => p.key === "Minimam")?.value ?? "")}
              <button
                onMouseDown={() => handleSuggestedRemovSearch("Minimam")}
                className=" flex justify-center items-center cursor-pointer w-3 h-3"
              >
                <X />
              </button>
            </Badge>
          ) : (
            <Badge
              className=" my-3 bg-primary text-white dark:text-black flex justify-between items-center"
              variant="outline"
            >
              Price: under{" "}
              {formatPrice(arr.find((p) => p.key === "Maximam")?.value ?? "")}
              <button
                onMouseDown={() => handleSuggestedRemovSearch("Maximam")}
                className=" flex justify-center items-center cursor-pointer w-3 h-3"
              >
                <X />
              </button>
            </Badge>
          )}
        </>
      );
    }
    if (arr.length == 0) {
      return null;
    }
  };

  //handel keypordss
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (query.listing.length && query.citys.length === 0) return;
    const lethquery = query.listing.length + query.citys.length;
    if (e.key === "PageDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % lethquery);
    }
    if (e.key === "PageUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? lethquery - 1 : prev - 1));
    }
    if (e.key === "Enter" && activeIndex >= 0) {
      alert(`Selected: ${query.citys[activeIndex]}`);
    }
  };

  // Sync active state onKeyUp (optional: highlights without moving)
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const lethquery = query.listing.length + query.citys.length;
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % lethquery);
    }
    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev <= 0 ? lethquery - 1 : prev - 1));
    }
  };
  ///return filter input sersh query
  return (
    <div className=" relative md:min-w-[30%] md:max-w-[30%] sm:min-w-[30%] wm:max-w-[30%] min-w-[50%] max-w-[50%] ">
      <div
        className={`w-full ${Object.entries(ParmesAll).length > 3 && isOpen ? "h-12.5" : ""}`}
      >
        <div className={` relative`}>
          {/* Filter Pills */}
          <div
            className={`flex  ${Object.entries(ParmesAll).length > 3 && isOpen ? `flex-col absolute left-0 top-0` : `flex-row block`} items-center w-full  max-w-lg  border rounded-xl  shadow-sm   ${isOpen ? "rounded-b-none" : ""}   shadow-sm overflow-hidden`}
          >
            <div
              className={`flex ${Object.entries(ParmesAll).length > 3 && isOpen ? `flex-wrap w-full  justify-start ` : `flex-nowrap`}     space-x-2  px-2 `}
            >
              {Object.entries(ParmesAll).length > 3 && !isOpen ? (
                <>
                  {Morefilter.map(([key, value], index) => (
                    <div key={index}>{formatBedge(key, value)}</div>
                  ))}
                </>
              ) : (
                <>
                  {Object.entries(ParmesAll).map(([key, value]) => (
                    <div key={key}>{formatBedge(key, value)}</div>
                  ))}
                </>
              )}
            </div>
            <div className=" flex flex-1 w-full ">
              <input
                type="text"
                placeholder="Enter address,city, zip, neighborhood, building..."
                onChange={(e) => {
                  setParmes(e.target.value);
                  handleSearch(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onFocus={() => {
                  setIsopen(true);
                }}
                onBlur={() => {
                  setIsopen(false);
                }}
                value={Parmes}
                className={`pl-3 py-3   flex-1 px-3  border-none  outline-none transition-all duration-300  focus:border-none  rounded-xl ${isOpen ? "rounded-b-none" : ""}  text-base dark:placeholder:text-white placeholder:text-gray-500 `}
              />
              <button className="px-4  text-gray-500 hover:text-gray-700">
                <Search />
              </button>
            </div>
          </div>
        </div>
      </div>
      {query.listing.length != 0 && isOpen && (
        <div
          className={`absolute w-full  md:w-auto left-0 right-0 mt-0 ${Object.entries(ParmesAll).length > 3 && isOpen ? (Object.entries(ParmesAll).length > 5 && isOpen ? `top-34` : `top-24`) : `top-full`} bg-popover  rounded-b-xl shadow-xl z-50 overflow-hidden border border-primary/10 dark:border-gray-700 animate-in slide-in-from-top-2 duration-300`}
        >
          <div
            className=" max-h-100 overflow-y-auto pb-1
                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar]:h-2
                [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-primary/10
                  [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-primary/50
                  dark:[&::-webkit-scrollbar-track]:bg-primary/50
                dark:[&::-webkit-scrollbar-thumb]:bg-primary/50"
          >
            {query.citys.length != 0 && (
              <div>
                <div className="mb-1 bg-primary/30 dark:bg-primary/30 p-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary  rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-primary dark:text-white animate-pulse">
                    City
                  </span>
                </div>
                <div className="space-y-1">
                  {query.citys.map((city, index) => {
                    const globalIndex = index;
                    return (
                      <button
                        key={index}
                        tabIndex={globalIndex}
                        onMouseDown={() =>
                          handleSuggestedSearch(city ?? "", "city")
                        }
                        onFocus={() => setActiveIndex(globalIndex)}
                        className={` focus:text-accent-foreground data-[variant=destructive]:text-destructive hover:border-l-2 hover:border-primary cursor-pointer data-[variant=destructive]:focus:bg-muted dark:data-[variant=destructive]:focus:bg-muted/20   data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted :hoverborder-l-2 hover:border-primary border-primary  w-full ${activeIndex == globalIndex ? "bg-muted  border-l-2  border-primary" : ""} data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`}
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <span>{city}</span>
                        <div className="ml-auto    opacity-10 group-hover:opacity-50 dark:opacity-50 transition-opacity duration-200">
                          <div className="w-5 h-5  rounded-full flex items-center justify-center">
                            <Search className="h-2 w-2 text-primary " />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="mb-1 mt-1 bg-primary/30 dark:bg-primary/30 p-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm  font-medium text-primary dark:text-white animate-pulse">
                Address
              </span>
            </div>
            <div className="space-y-1">
              {query.listing.map((search, index) => {
                const globalIndex = query.citys.length + index;
                return (
                  <button
                    tabIndex={globalIndex}
                    key={index}
                    onMouseDown={() =>
                      handleSuggestedSearch(
                        search?.location?.street_address ?? "",
                        "address"
                      )
                    }
                    onFocus={() => setActiveIndex(globalIndex)}
                    className={` focus:text-accent-foreground data-[variant=destructive]:text-destructive cursor-pointer data-[variant=destructive]:focus:bg-muted dark:data-[variant=destructive]:focus:bg-muted/20   data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted :hoverborder-l-2 hover:border-primary hover:border-l-2 hover:border-primary  w-full ${activeIndex == globalIndex ? "bg-muted  border-l-2  border-primary" : ""} data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {search.location.street_address}
                    <div className="ml-auto opacity-10 group-hover:opacity-100 dark:opacity-50 transition-opacity duration-200">
                      <div className="w-5 h-5 z-99  rounded-full flex items-center justify-center">
                        <Search className="h-2 w-2 text-primary" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sershinout;
