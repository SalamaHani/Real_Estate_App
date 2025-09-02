"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { useRouter, useSearchParams } from "next/navigation";
import { formatPrice } from "@/utils/format";
const pricse = [
  { label: "$100K", value: "100000" },
  { label: "$150K", value: "150000" },
  { label: "$200K", value: "200000" },
  { label: "$250K", value: "250000" },
  { label: "$300K", value: "300000" },
  { label: "$400K", value: "400000" },
  { label: "$500K", value: "500000" },
  { label: "$600K", value: "600000" },
  { label: "$700K", value: "700000" },
  { label: "$750K", value: "750000" },
  { label: "$800K", value: "800000" },
  { label: "$900K", value: "900000" },
  { label: "$1M", value: "1000000" },
  { label: "$1.25M", value: "1250000" },
  { label: "$1.5M", value: "1500000" },
  { label: "$1.75M", value: "1750000" },
  { label: "$2M", value: "2000000" },
  { label: "$2.25M", value: "2250000" },
  { label: "$2.5M", value: "2500000" },
  { label: "$2.75M", value: "2750000" },
  { label: "$3M", value: "3000000" },
  { label: "$3.5M", value: "3500000" },
  { label: "$4M", value: "4000000" },
  { label: "$4.5M", value: "4500000" },
  { label: "$5M", value: "5000000" },
  { label: "$6M", value: "6000000" },
  { label: "$7M", value: "7000000" },
  { label: "$8M", value: "8000000" },
  { label: "$9M", value: "9000000" },
  { label: "$10M", value: "10000000" },
  { label: "$12M", value: "12000000" },
  { label: "$14M", value: "14000000" },
  { label: "$16M", value: "16000000" },
  { label: "$18M", value: "18000000" },
  { label: "$20M", value: "20000000" },
];
export type PriceOption = {
  label: string;
  value: string;
};
export function ComboboxPrice({ type }: { type: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const selctedprice = params.get(type);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const handlePriceSearch = (value: string, typeParmes: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(typeParmes, value);
    }
    replace(`/listing?${params.toString()}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[50%] justify-between"
        >
          {value
            ? pricse.find((price: PriceOption) => price.value === value)?.label
            : selctedprice != null
              ? formatPrice(selctedprice)
              : type}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[55%] p-0">
        <Command>
          <CommandInput placeholder={`${type}`} className="h-9" />
          <CommandList
            className="[&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar]:ml-2
                [&::-webkit-scrollbar]:h-5
                [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-gray-100
                 [&::-webkit-scrollbar-thumb]:rounded-full
               [&::-webkit-scrollbar-thumb]:bg-gray-400
                 dark:[&::-webkit-scrollbar-track]:bg-neutral-400
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            <CommandEmpty>No Price found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-auto">
                {pricse.map((price: PriceOption) => (
                  <CommandItem
                    key={price.value}
                    value={price.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      handlePriceSearch(currentValue, type);
                      setOpen(false);
                    }}
                  >
                    {price.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === price.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
