import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CuantersT } from "@/utils/Type";

export function Selectcuntery({ Arr }: { Arr: CuantersT[] }) {
  return (
    <Select name="country">
      <SelectTrigger className="w-full dark:bg-dark-900 h-11  rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10   dark:focus:border-brand-800">
        <SelectValue placeholder="Select a  Country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Arr.map((item) => {
            return (
              <SelectItem key={item.iso_code} value={item.country}>
                {item.country} {`(${item.iso_code})`}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
