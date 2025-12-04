"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import SingleStock from "./SingleStock";

async function fetchCoins() {
  console.log("RUN QUERY FN");
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  );
  return res.json();
}

function StockWithPrice() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchCoins,
    // refetchInterval: 10000,
    // staleTime: 10000,
    retry: 3,
    retryDelay: 3000,
  });

  const [sortBy, setSortBy] = useState("market_cap");
  const sortedData = React.useMemo(() => {
    if (!data) return [];

    if (sortBy === "price-low") {
      return [...data].sort((a, b) => a.current_price - b.current_price);
    }
    if (sortBy === "price-high") {
      return [...data].sort((a, b) => b.current_price - a.current_price);
    }

    if (sortBy === "market_cap") {
      return [...data].sort((a, b) => b.market_cap - a.market_cap);
    }

    return data;
  }, [data, sortBy]);

  if (isLoading) return "Loading...";
  if (error) return "something went wrong.";
  return (
    <div className="">
      <div className="filters flex gap-5 justify-center mb-2">
        <button
          onClick={() => setSortBy("market_cap")}
          className={`${sortBy === "market_cap" ? "text-blue-500" : ""}`}
        >
          Market-cap
        </button>
        <button
          onClick={() => setSortBy("price-low")}
          className={`${sortBy === "price-low" ? "text-blue-500" : ""}`}
        >
          Price-low
        </button>
        <button
          onClick={() => setSortBy("price-high")}
          className={`${sortBy === "price-high" ? "text-blue-500" : ""}`}
        >
          Price-High
        </button>
      </div>
      {sortedData &&
        sortedData.map((coin: any, index: number) => {
          return <SingleStock key={index} coin={coin} />;
        })}
    </div>
  );
}

export default StockWithPrice;
