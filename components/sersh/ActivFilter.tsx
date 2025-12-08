"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

function Activfilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const isactiv = params.get("Status");
  const filterOptionsTyep = [
    {
      id: "Active",
      label: "Status",
      value: "Active",
    },
    {
      id: "Sold",
      label: "Status",
      value: "Contingent",
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
    <div className="flex  dark:bg-black items-center p-1 border rounded-xl   bg-white shadow-sm ">
      {filterOptionsTyep.map((item) => {
        const isSelected = item.value == isactiv;
        return (
          <Button
            key={item.id}
            variant="ghost"
            size="lg"
            className={`flex items-center gap-1 cursor-pointer  transition-all duration-300  font-medium ${isSelected
              ? "bg-primary text-primary-foreground shadow-md border border-primary/20"
              : "text-card-foreground dark:text-white"
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

export default Activfilter;
