"use client";
import React, { useState } from "react";
import { MotionDiv, Motionh1, MotionP } from "../motindev";
import { Search } from "lucide-react";
import { listing } from "@prisma/client";
import { useDebouncedCallback } from "use-debounce";
import { SershQuerlisting } from "@/utils/actions";
import { useRouter } from "next/navigation";

type QueryResult = {
  listing: listing[];
  citys: string[];
};

function HeroSection() {
  const router = useRouter();
  const [isOpen, setIsopen] = useState(false);
  const [Parmes, setParmes] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [query, setQuery] = useState<QueryResult>({ listing: [], citys: [] });

  //handel fetsh servar action
  //handel navigate to listing page with city filter
  const handleNavigateToListing = (city: string) => {
    setIsopen(false);
    setParmes("");
    router.push(`/listing?city=${encodeURIComponent(city)}`);
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
      if (activeIndex < query.citys.length) {
        handleNavigateToListing(query.citys[activeIndex]);
      }
    }
  };

  //handel sersh query
  const handleSearch = useDebouncedCallback(async (value: string) => {
    const querey = await SershQuerlisting(value);
    setQuery(querey);
  }, 500);

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
  return (
    <section
      className="relative h-[71vh] w-full bg-cover bg-center flex items-center justify-center object-cover "
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      }}
    >
      <div className="absolute w-full inset-0 bg-black/40" />
      <MotionDiv
        className="relative z-10 text-center text-white w-[40%]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Motionh1
          className="text-5xl md:text-5xl italic  font-medium d mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          What is my Home Worth?
        </Motionh1>
        <MotionP
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Enter the property address to see the home valuation report
        </MotionP>
        <div className="relative w-full">
          <div className=" flex flex-1 w-full ">
            <input
              type="text"
              placeholder="Enter your home address..."
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
              className={`pl-3 py-3 bg-gray-50 dark:bg-popover dark:text-white  h-15  flex-1 px-3  border-none  outline-none transition-all duration-300  focus:border-none  rounded-md ${isOpen ? "rounded-b-none" : ""}    text-black dark:placeholder:text-white placeholder:text-gray-800 `}
            />
            <button className="px-4 absolute right-0 top-4 text-primary\10 hover:text-primary">
              <Search />
            </button>
          </div>
        </div>
        {query.listing.length != 0 && isOpen && (
          <div
            className={`absolute  left-0 right-0 mt-0 top-45   rounded-b-xl shadow-xl z-50 overflow-hidden  bg-popover   border border-primary/10 dark:border-gray-700 animate-in slide-in-from-top-2 duration-300`}
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
                  <div className="mb-1 mt-1 bg-primary/30 dark:bg-primary/30 p-2 flex items-center gap-2">
                    <div className="w-2 h-2  rounded-full animate-pulse"></div>
                    <span className="text-sm  font-medium text-primary dark:text-white animate-pulse">
                      City
                    </span>
                  </div>
                  <div className="space-y-1  ">
                    {query.citys.map((city, index) => {
                      const globalIndex = index;
                      return (
                        <button
                          key={index}
                          tabIndex={globalIndex}
                          onMouseDown={() => handleNavigateToListing(city)}
                          onFocus={() => setActiveIndex(globalIndex)}
                          className={`focus:bg-accent text-primary  focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-primary/10 dark:data-[variant=destructive]:focus:bg-primary/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 hover:bg-muted :hoverborder-l-2 hover:border-primary border-primary w-full ${activeIndex == globalIndex ? "bg-muted border-l-2 border-primary" : ""} data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`}
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
              <div className="space-y-1  ">
                {query.listing.map((search, index) => {
                  const globalIndex = query.citys.length + index;
                  return (
                    <button
                      tabIndex={globalIndex}
                      key={index}
                      onMouseDown={() => {
                        const city =
                          search.location?.city ||
                          search.location?.street_address
                            ?.split(",")[1]
                            ?.trim() ||
                          "";
                        if (city) {
                          handleNavigateToListing(city);
                        }
                      }}
                      onFocus={() => setActiveIndex(globalIndex)}
                      className={`focus:bg-accent text-primary focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 hover:bg-muted :hoverborder-l-2 hover:border-primary border-primary  w-full ${activeIndex == globalIndex ? "bg-muted  border-l-2  border-primary" : ""} data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`}
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
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        ></MotionDiv>
      </MotionDiv>
    </section>
  );
}

export default HeroSection;
