import { getRsFromUsd } from "@/app/lib/utils/currencyConversion";
import React from "react";

type Coin = {
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
};

function SingleStock({ coin }: { coin: Coin }) {
  //   const isPositive = coin.price_change_percentage_24h >= 0;
  const isPositive = true;

  return (
    <div className="bg-white shadow-md max-w-md mx-auto flex items-center gap-4 p-4 rounded-xl mb-3">
      {/* Coin Image */}
      <img
        src={coin.image}
        alt={coin.name}
        className="w-10 h-10 rounded-full"
      />

      <div className="flex-1">
        <h2 className="font-semibold text-lg">{coin.name || "demo coin"}</h2>
        <p className="text-gray-500 uppercase text-sm">
          {coin.symbol || "symb"}
        </p>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg">
          Rs{getRsFromUsd(coin.current_price) || 999}
        </p>
        <p
          className={`text-sm font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {coin?.price_change_percentage_24h.toFixed(2) || 100}%
        </p>
      </div>
    </div>
  );
}

export default SingleStock;
