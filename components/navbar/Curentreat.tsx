"use client";
import { useCurrency } from "@/app/hooks/useCuntryrat";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { Currency } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";

const currencies = ["USD", "EUR", "GBP", "HUF", "JPY"];

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const router = useRouter();
  async function handleSelect(newCurrency: string) {
    setCurrency(newCurrency);
    router.refresh();
  }
  return (
    <Menubar className="border rounded-md shadow-sm h-9">
      <MenubarMenu>
        <MenubarTrigger className="px-3 py-1 cursor-pointer ">
          {currency}
          <Currency className="h-3 w-3" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Select Currency</MenubarItem>
          <DropdownMenuSeparator />
          {currencies.map((cur) => (
            <MenubarItem
              key={cur}
              onClick={() => handleSelect(cur)}
              className={
                cur === currency ? "font-bold bg-neutral-700 text-primary" : ""
              }
            >
              {cur}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
