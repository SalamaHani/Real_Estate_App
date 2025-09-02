"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

function SallandRell() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isactiv, setisactiv] = useState("");
  const filterOptionsTyep = [
    {
      id: "Sales",
      label: "listing_type",
      value: "sales",
    },
    {
      id: "Rentals",
      label: "listing_type",
      value: "rentals",
    },
  ];
  const handleSuggestedSearch = (value: string, typeParmes: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(typeParmes, value);
    } else {
      params.delete(typeParmes);
    }
    setisactiv(params.get(typeParmes) ?? "");
    replace(`/listing?${params.toString()}`);
  };
  console.log(isactiv);
  return (
    <div className="flex dark:bg-black items-center p-1 border rounded-xl  bg-white shadow-sm overflow-hidden">
      {filterOptionsTyep.map((item) => {
        const isSelected = item.value == isactiv;
        return (
          <Button
            key={item.id}
            variant="ghost"
            size="lg"
            className={`flex items-center gap-1 cursor-pointer  transition-all duration-300  font-medium ${
              isSelected
                ? "bg-black dark:bg-white dark:text-black text-white shadow-sm   border border-gray-200 dark:border-gray-700"
                : "hover:bg-gray-200 g-card text-card-foreground  dark:text-gray-400"
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
