"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

function SallandRell() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const isactiv = params.get("listing_type");
  const filterOptionsTyep = [
    {
      id: "Sales",
      label: "listing_type",
      value: "Sales",
    },
    {
      id: "Rentals",
      label: "listing_type",
      value: "Rentals",
    },
  ];
  const handleSuggestedSearch = (value: string, typeParmes: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(typeParmes, value);
    } else {
      params.delete(typeParmes);
    }
    replace(`/listing?${params.toString()}`);
  };
  return (
    <div className="flex  items-center p-1 border rounded-xl  shadow-sm ">
      {filterOptionsTyep.map((item) => {
        const isSelected = item.value == isactiv;
        return (
          <Button
            key={item.id}
            variant="ghost"
            size="lg"
            className={`flex items-center gap-1 cursor-pointer  transition-all duration-300  font-medium ${
              isSelected
                ? "  bg-primary text-black  shadow-sm   border  "
                : " g-card text-card-foreground  "
            }`}
            onClick={() => handleSuggestedSearch(item.value, item.label)}
          >
            {item.id}
          </Button>
        );
      })}
    </div>
  );
}

export default SallandRell;
