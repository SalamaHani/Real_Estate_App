"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "../form/Buttons";
import { SaveSearchUserAction } from "@/utils/actions";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useActionState, useEffect } from "react";
import { ActionUserSeavd } from "@/utils/Tayp";
import React from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/utils/format";
const initialState: ActionUserSeavd = {
  success: false,
  message: "",
};
type KeyValue = {
  key: string;
  value: string; // or number, depending on your data
};
export function Savedfilter() {
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [state, action] = useActionState(SaveSearchUserAction, initialState);
  const [value, setValue] = React.useState<string>("");
  const [ParmesAll, setPramsAll] = React.useState(
    Object.fromEntries(searchParams.entries())
  );
  console.log(ParmesAll);
  const params = new URLSearchParams(searchParams);
  const URL = "" + params;
  useEffect(() => {
    if (!searchParams.get("Parmes")) {
    }
    setPramsAll(Object.fromEntries(searchParams.entries()));
  }, [searchParams]);
  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message);
      setOpen(false);
    }
  }, [state?.success, state?.message]);
  const prices = Object.entries(ParmesAll)
    .filter(([key]) => key === "Maximam" || key === "Minimam")
    .map(([key, value]) => ({ key, value }));

  const Morefilter = Object.entries(ParmesAll).slice(0, 2);
  const lenesthmotre = Object.entries(ParmesAll).length - Morefilter.length;
  Morefilter.push(["more", `${lenesthmotre}`]);
  let handelorice = false;
  const formatBedge = (key: string, value: string) => {
    if ((key == "Maximam" || key == "Minimam") && !handelorice) {
      handelorice = true;
      return handelprice(prices);
    }
    if ((key == "Maximam" || key == "Minimam") && handelorice) {
      return null;
    }
    if (key == "Bads" || key == "Baths") {
      if (value == "Studio") {
        return (
          <Badge
            className="bg-primary text-white dark:text-black my-3 flex justify-between items-center"
            variant="outline"
          >
            {value}
          </Badge>
        );
      } else {
        return (
          <Badge
            className="bg-primary text-white dark:text-black my-3 flex justify-between items-center"
            variant="outline"
          >
            {key}:{value}
          </Badge>
        );
      }
    }
    if (key == "more") {
      return (
        <Badge
          className="bg-primary text-white dark:text-black my-3 flex justify-between items-center"
          variant="outline"
        >
          {key}:({value})
        </Badge>
      );
    }
    if (key == "Page" || key == "Map") {
      return null;
    }
    return (
      <Badge
        className="bg-primary text-white dark:text-black my-3 flex justify-between items-center"
        variant="outline"
      >
        {value}
      </Badge>
    );
  };
  const handelprice = (arr: KeyValue[]) => {
    if (arr.length == 2) {
      return (
        <Badge
          className="bg-primary text-white dark:text-black my-3 flex justify-between items-center"
          variant="outline"
        >
          Price:{" "}
          {formatPrice(arr.find((p) => p.key === "Minimam")?.value ?? "")} to{" "}
          {formatPrice(arr.find((p) => p.key === "Maximam")?.value ?? "")}
        </Badge>
      );
    }
    if (arr.length == 1) {
      return (
        <>
          {arr.find((p) => p.key === "Minimam")?.key == "Minimam" ? (
            <Badge
              className="bg-primary text-white dark:text-black my-3 flex justify-between items-center"
              variant="outline"
            >
              Price: ovar{" "}
              {formatPrice(arr.find((p) => p.key === "Minimam")?.value ?? "")}
            </Badge>
          ) : (
            <Badge
              className="bg-primary text-white dark:text-black my-3 flex justify-between items-center"
              variant="outline"
            >
              Price: under{" "}
              {formatPrice(arr.find((p) => p.key === "Maximam")?.value ?? "")}
            </Badge>
          )}
        </>
      );
    }
    if (arr.length == 0) {
      return null;
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex dark:bg-black items-center p-1 border rounded-xl  bg-white shadow-sm">
              <Button
                variant="ghost"
                size="lg"
                className=" flex items-center gap-1 cursor-pointer  transition-all duration-300  hover:bg-gray-100 g-card text-card-foreground  dark:text-white "
                onClick={() => {
                  setOpen(true);
                }}
              >
                Seavd
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save Your Search</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-3">
          <DialogTitle>Save Your Search</DialogTitle>
        </DialogHeader>
        <form className="" action={action}>
          <div className="w-[100%]">
            <Label className="mb-2" htmlFor="FirstName">
              Name Your Search <span className="text-red-500">*</span>
            </Label>
            <Input
              name="nameSearch"
              id="nameSearch"
              type="text"
              defaultValue={state.Data?.nameSearch}
              className={state?.errors?.nameSearch ? "border-red-500" : ""}
            />
            {state.errors?.nameSearch && (
              <p className="text-red-500 text-xs">{state.errors.nameSearch}</p>
            )}
          </div>
          <div
            className={`flex mt-5 mb-5  flex-wrap w-full  justify-start space-x-1  `}
          >
            {Object.entries(ParmesAll).map(([key, value]) => {
              return <div key={key}>{formatBedge(key, value)}</div>;
            })}
          </div>
          <div className="w-[100%] mb-10">
            <Label className="mb-2" htmlFor="email_frequency">
              Email Alerts<span className="text-red-500">*</span>
            </Label>
            <input type="hidden" readOnly name="email_frequency" value={value} />
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger className="w-[100%]">
                <SelectValue placeholder="Weekly" />
              </SelectTrigger>
              <SelectContent side="top" align="center">
                <SelectGroup>
                  <SelectItem value="Instantly">Instantly</SelectItem>
                  <SelectItem value="Hourly">Hourly</SelectItem>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Never">Never</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="w-[100%]">
            <SubmitButton className="w-full" text="Save Search" />
          </DialogFooter>
          <input type="text" readOnly hidden name="url" value={URL} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
