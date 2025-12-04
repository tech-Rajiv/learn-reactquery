"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import SingleStock from "./SingleStock";
import { useInView } from "react-intersection-observer";

async function fetchCoins() {
  console.log("RUN QUERY FN");
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
    {
      cache: "no-store",
    }
  );
  return res.json();
}

function StockWithPrice() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["coins"],
    queryFn: fetchCoins,
    refetchInterval: 10000,
    staleTime: 10000,
    refetchIntervalInBackground: false, // 🚫 no background polling
  });
  const [visibleCount, setVisibleCount] = useState(5);
  const [inifinteLoding, setInfineLoading] = useState(false);
  const { ref, inView } = useInView();
  const [sortBy, setSortBy] = useState("market_cap");

  const sortedData = React.useMemo(() => {
    if (!data) return [];
    if (sortBy === "price-low") {
      return [...data]
        .sort((a, b) => a.current_price - b.current_price)
        .slice(0, visibleCount);
    }
    if (sortBy === "price-high") {
      return [...data]
        .sort((a, b) => b.current_price - a.current_price)
        .slice(0, visibleCount);
    }

    if (sortBy === "market_cap") {
      return [...data]
        .sort((a, b) => b.market_cap - a.market_cap)
        .slice(0, visibleCount);
    }
    return data;
  }, [data, sortBy, visibleCount]);

  useEffect(() => {
    if (inifinteLoding) return;
    if (inView) {
      setInfineLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + 5);
        setInfineLoading(false);
      }, 2000);
    }
  }, [inView]);

  if (isLoading) return "Loading...";
  // if (error) return "something went wrong.";
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
          return (
            <div key={index}>
              <SingleStock coin={coin} />
            </div>
          );
        })}
      <div ref={ref} className="mt-5">
        {inifinteLoding && "loading..."}
      </div>
    </div>
  );
}

export default StockWithPrice;
