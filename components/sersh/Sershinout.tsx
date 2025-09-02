"use client";
import { SershQuerlisting } from "@/utils/actions";

import { useSearchParams, useRouter } from "next/navigation";

// import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { Listing } from "@prisma/client";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/utils/format";

type QueryResult = {
  listing: Listing[];
  citys: string[];
};
function Sershinout() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isOpen, setIsopen] = useState(false);
  const [Parmes, setParmes] = useState("");
  const [ParmesAll, setPramsAll] = useState(
    Object.fromEntries(searchParams.entries())
  );
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

  const filtringgionrpeice = Object.fromEntries(
    Object.entries(ParmesAll).filter(
      ([key]) => key !== "Maximam" && key !== "Minimam"
    )
  );

  type KeyValue = {
    key: string;
    value: string; // or number, depending on your data
  };

  const handelprice = (arr: KeyValue[]) => {
    if (arr.length == 2) {
      return (
        <Badge
          className="dark:bg-neutral-700 bg-neutral-200 flex justify-between items-center"
          variant="outline"
        >
          Price:{" "}
          {formatPrice(arr.find((p) => p.key === "Minimam")?.value ?? "")} to{" "}
          {formatPrice(arr.find((p) => p.key === "Maximam")?.value ?? "")}
          <button
            onClick={() => handleSuggestedRemovSearch("Maximam")}
            className=" flex justify-center items-center cursor-pointer w-3 h-3"
          >
            <X />
          </button>
        </Badge>
      );
    } else if (arr.length == 1) {
      return (
        <>
          {arr.find((p) => p.key === "Minimam")?.key == "Minimam" ? (
            <Badge
              className="dark:bg-neutral-700 bg-neutral-200 flex justify-between items-center"
              variant="outline"
            >
              Price: ovar{" "}
              {formatPrice(arr.find((p) => p.key === "Minimam")?.value ?? "")}
              <button
                onClick={() => handleSuggestedRemovSearch("Minimam")}
                className=" flex justify-center items-center cursor-pointer w-3 h-3"
              >
                <X />
              </button>
            </Badge>
          ) : (
            <Badge
              className="dark:bg-neutral-700 bg-neutral-200 flex justify-between items-center"
              variant="outline"
            >
              Price: under{" "}
              {formatPrice(arr.find((p) => p.key === "Maximam")?.value ?? "")}
              <button
                onClick={() => handleSuggestedRemovSearch("Maximam")}
                className=" flex justify-center items-center cursor-pointer w-3 h-3"
              >
                <X />
              </button>
            </Badge>
          )}
        </>
      );
    } else if (arr.length == 0) {
      return null;
    }
  };
  return (
    <div className=" relative min-w-[40%] ">
      <div className="w-full">
        <div className={` relative`}>
          {/* Filter Pills */}
          <div
            className={`  flex flex-row dark:bg-black  items-center w-full  max-w-lg border  border-gray-300 rounded-xl  ${isOpen ? "rounded-b-none" : ""}  bg-white shadow-sm overflow-hidden`}
          >
            <div className="flex  items-center space-x-2 py-3 px-2">
              {Object.entries(filtringgionrpeice).map(([key, value]) => (
                <div key={key}>
                  {key == "Bads" || key == "Baths" ? (
                    value == "Studio" ? (
                      <Badge
                        className="dark:bg-neutral-700 bg-neutral-200 flex justify-between items-center"
                        variant="outline"
                      >
                        {value}
                        <button
                          onClick={() => handleSuggestedRemovSearch(key)}
                          className=" flex justify-center items-center cursor-pointer w-3 h-3"
                        >
                          <X />
                        </button>
                      </Badge>
                    ) : (
                      <Badge
                        className="dark:bg-neutral-700 bg-neutral-200 flex justify-between items-center"
                        variant="outline"
                      >
                        {key}:{value}
                        <button
                          onClick={() => handleSuggestedRemovSearch(key)}
                          className=" flex justify-center items-center cursor-pointer w-3 h-3"
                        >
                          <X />
                        </button>
                      </Badge>
                    )
                  ) : (
                    <Badge
                      className="dark:bg-neutral-700 bg-neutral-200 flex justify-between items-center"
                      variant="outline"
                    >
                      {value}
                      <button
                        onClick={() => handleSuggestedRemovSearch(key)}
                        className=" flex justify-center items-center cursor-pointer w-3 h-3"
                      >
                        <X />
                      </button>
                    </Badge>
                  )}
                </div>
              ))}
              {handelprice(prices)}
            </div>
            <div className=" flex flex-1 w-full ">
              <input
                type="text"
                placeholder="Enter address,city, zip, neighborhood, building..."
                onChange={(e) => {
                  setParmes(e.target.value);
                  handleSearch(e.target.value);
                }}
                onFocus={() => {
                  setIsopen(true);
                }}
                onBlur={() => {
                  setIsopen(false);
                }}
                value={Parmes}
                className={`pl-3 py-3 bg-gray-50 dark:bg-black  flex-1 px-3  border-none  outline-none transition-all duration-300  focus:border-none  rounded-xl ${isOpen ? "rounded-b-none" : ""}  text-base dark:placeholder:text-white placeholder:text-gray-500 `}
              />
              <button className="px-4  text-gray-500 hover:text-gray-700">
                <Search />
              </button>
            </div>
          </div>
        </div>
      </div>
      {query.listing.length != 0 && isOpen && (
        <div className="absolute top-full left-0 right-0 mt-0 bg-white dark:bg-black rounded-b-xl shadow-xl z-50 overflow-hidden border border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-2 duration-300">
          <div
            className=" max-h-100 overflow-y-auto pb-1
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar]:h-5
                [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-gray-100
                 [&::-webkit-scrollbar-thumb]:rounded-full
               [&::-webkit-scrollbar-thumb]:bg-gray-400
                 dark:[&::-webkit-scrollbar-track]:bg-neutral-400
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            {query.citys.length != 0 && (
              <div>
                <div className="mb-1 bg-gray-100 dark:bg-neutral-800 p-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    City
                  </span>
                </div>
                <div className="space-y-1">
                  {query.citys.map((city, index) => (
                    <button
                      key={index}
                      onMouseDown={() =>
                        handleSuggestedSearch(city ?? "", "city")
                      }
                      className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-200 hover:border-l-1 dark:hover:bg-neutral-700 border-gray-500 w-full data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <span>{city}</span>
                      <div className="ml-auto opacity-10 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-5 h-5  rounded-full flex items-center justify-center">
                          <Search className="h-2 w-2 text-black " />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mb-1 mt-1 bg-gray-100 dark:bg-neutral-800 p-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm  font-medium text-gray-500 dark:text-gray-400">
                Address
              </span>
            </div>
            <div className="space-y-1">
              {query.listing.map((search, index) => (
                <button
                  key={index}
                  onMouseDown={() =>
                    handleSuggestedSearch(
                      search?.location?.street_address ?? "",
                      "address"
                    )
                  }
                  className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-200 hover:border-l-1 dark:hover:bg-neutral-700 border-gray-500 w-full data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {search.location.street_address}
                  <div className="ml-auto opacity-10 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-5 h-5 z-99  rounded-full flex items-center justify-center">
                      <Search className="h-2 w-2 text-black" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sershinout;
