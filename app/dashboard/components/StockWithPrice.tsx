"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import SingleStock from "./SingleStock";

async function fetchCoins() {
  console.log("RUN QUERY FN");
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
    { cache: "no-store" }
  );
  return res.json();
}

function StockWithPrice() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchCoins,
    refetchInterval: 25000,
    staleTime: 25000,
  });

  if (isLoading) return "Loading...";
  if (error) return "something went wrong.";
  return (
    <div className=" ">
      {data &&
        data.map((coin: any, index: number) => {
          return <SingleStock key={index} coin={coin} />;
        })}
    </div>
  );
}

export default StockWithPrice;
