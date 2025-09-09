"use client";
import { useCurrency } from "@/app/hooks/useCuntryrat";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import {
  Circle,
  DollarSign,
  Euro,
  JapaneseYen,
  PoundSterling,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
export const currencies = [
  {
    name: "US Dollar",
    value: "USD",
    icon: DollarSign,
  },
  {
    name: "Euro",
    value: "EUR",
    icon: Euro,
  },
  {
    name: "British Pound",
    value: "GBP",
    icon: PoundSterling,
  },
  {
    name: "Hungarian Forint",
    value: "HUF",
    icon: Circle, // no specific icon, fallback to Circle
  },
  {
    name: "Japanese Yen",
    value: "JPY",
    icon: JapaneseYen,
  },
];
export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const router = useRouter();
  function handleSelect(newCurrency: string) {
    setCurrency(newCurrency);
    router.refresh();
  }
  return (
    <Menubar className="border rounded-md shadow-sm h-9">
      <MenubarMenu>
        <MenubarTrigger className="px-3 py-1 dark:bg-input/30 cursor-pointer ">
          {currencies.map((item) => {
            const Iconse = item.icon;
            if (item.value == currency) {
              return (
                <div
                  key={item.value}
                  className=" w-full flex justify-between items-center"
                >
                  {item.value}
                  <Iconse className="w-3 mr-1 h-3" />
                </div>
              );
            }
          })}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Select Currency</MenubarItem>
          <DropdownMenuSeparator />
          {currencies.map((cur) => {
            const Iconse = cur.icon;
            return (
              <MenubarItem
                key={cur.value}
                onClick={() => handleSelect(cur.value)}
                className={
                  cur.value === currency
                    ? "font-bold dark:bg-neutral-700 bg-neutral-500 text-primary"
                    : ""
                }
              >
                <div className="w-full flex justify-between items-center">
                  {cur.value}
                  <Iconse className="w-4 h-4" />
                </div>
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
