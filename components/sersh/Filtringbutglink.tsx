import React from "react";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/utils/format";
type KeyValue = {
  key: string;
  value: string;
};
function Filtringbutglink({ Link }: { Link: string }) {
  console.log(Link);
  const params = new URLSearchParams(Link);
  const parmesAll = Object.fromEntries(params.entries());
  const prices = Object.entries(Link)
    .filter(([key]) => key === "Maximam" || key === "Minimam")
    .map(([key, value]) => ({ key, value }));
  const Morefilter = Object.entries(parmesAll).slice(0, 2);
  const lenesthmotre = Object.entries(parmesAll).length - Morefilter.length;
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
            className="dark:bg-neutral-700 my-3 bg-neutral-200 flex justify-between items-center"
            variant="outline"
          >
            {value}
          </Badge>
        );
      } else {
        return (
          <Badge
            className="dark:bg-neutral-700 my-3 bg-neutral-200 flex justify-between items-center"
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
          className="dark:bg-neutral-700 my-3 bg-neutral-200 flex justify-between items-center"
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
        className="dark:bg-neutral-700 my-3 bg-neutral-200 flex justify-between items-center"
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
          className="dark:bg-neutral-700 my-3 bg-neutral-200 flex justify-between items-center"
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
              className="dark:bg-neutral-700 my-3 bg-neutral-200 flex justify-between items-center"
              variant="outline"
            >
              Price: ovar{" "}
              {formatPrice(arr.find((p) => p.key === "Minimam")?.value ?? "")}
            </Badge>
          ) : (
            <Badge
              className="dark:bg-neutral-700 my-3 bg-neutral-200 flex justify-between items-center"
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
    <div className={`flex  flex-wrap w-full  justify-start space-x-1  `}>
      {Object.entries(parmesAll).map(([key, value]) => {
        return <div key={key}>{formatBedge(key, value)}</div>;
      })}
    </div>
  );
}

export default Filtringbutglink;
