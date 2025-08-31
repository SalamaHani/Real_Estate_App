"use client";
import { SershQuerCatylistirng, SershQuerlisting } from "@/utils/actions";
import { Input } from "../ui/input";
// import { useSearchParams, useRouter } from "next/navigation";

// import { useState, useEffect } from "react";
import { MapPinCheckInside, Search } from "lucide-react";
// import { isRealString } from "@/utils/format";

import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { Listing } from "@prisma/client";
type QueryResult = {
  listing: Listing[];
  citys: string[];
};
function Sershinout() {
  //   const searchParams = useSearchParams();
  //   const { replace } = useRouter();
  const [Parmes, setParmes] = useState("");
  const [query, setQuery] = useState<QueryResult>({ listing: [], citys: [] });
  const retunequer = async (val: string) => {
    const liset = await SershQuerlisting(val);
    const cites = await SershQuerCatylistirng(val);
    console.log(cites);
    return {
      listing: liset,
      citys: cites,
    };
  };
  const handleSearch = useDebouncedCallback(async (value: string) => {
    const querey = await retunequer(value);
    setQuery(querey);
    // const params = new URLSearchParams(searchParams);
    // if (value && isRealString(value)) {
    //   params.set("Parmes", value);
    // } else {
    //   params.delete("Parmes");
    // }
    // replace(`/products?${params.toString()}`);
  }, 500);

  //   useEffect(() => {
  //     if (!searchParams.get("Parmes")) {
  //       setParmes("");
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [searchParams.get("Parmes")]);
  console.log(query);
  return (
    <div className="relative md:block hidden">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-white" />
      <Input
        type="search"
        placeholder="Search Product..."
        onChange={(e) => {
          setParmes(e.target.value);
          handleSearch(e.target.value);
        }}
        value={Parmes}
        className="pl-10 py-3 bg-gray-50 w-sm text-base dark:placeholder:text-white placeholder:text-gray-500"
      />
      {query.listing.length != 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden border border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-2 duration-300">
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                City
              </span>
            </div>
            <div className="space-y-1">
              {query.citys.map((city, index) => (
                <button
                  key={index}
                  //   onClick={() => handleSuggestedSearch(search)}
                  className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-300 w-full data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="font-bold text-gray-500">{city}</span>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                      <Search className="h-2 w-2 text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm  font-medium text-gray-500 dark:text-gray-400">
                Address
              </span>
            </div>
            <div className="space-y-1">
              {query.listing.map((search, index) => (
                <button
                  key={index}
                  //   onClick={() => handleSuggestedSearch(search)}
                  className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-300 w-full data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {search.location.zip_code}:
                  <span className="font-bold text-gray-500">
                    {search.location.county}
                  </span>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                      <Search className="h-2 w-2 text-white" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                    Ctrl
                  </kbd>
                  <span>+</span>
                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
                    /
                  </kbd>
                </div>
                <span>to focus search</span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live search</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sershinout;
