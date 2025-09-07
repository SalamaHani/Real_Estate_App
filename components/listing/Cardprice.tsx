"use client";
import React from "react";
import { CardTitle } from "../ui/card";
import { useCurrency } from "@/app/hooks/useCuntryrat";
import { formatCurrency } from "@/utils/format";
function Cardprice({ price }: { price: number | undefined }) {
  const { convertPrice, currency } = useCurrency();
  const priceconvart = convertPrice(price ?? 5, currency as string);
  return (
    <CardTitle className="text-xl">
      {formatCurrency(priceconvart, currency)}
    </CardTitle>
  );
}

export default Cardprice;
