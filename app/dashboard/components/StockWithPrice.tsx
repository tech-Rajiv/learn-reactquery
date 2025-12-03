"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import SingleStock from "./SingleStock";

async function fetchCoins() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  );
  console.log("got res: ", res);
  if (!res.ok) throw new Error("Failed to fetch coins");
  return res.json();
}

function StockWithPrice() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchCoins,
    refetchInterval: 10000,
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
