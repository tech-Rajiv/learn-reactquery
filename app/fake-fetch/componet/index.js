"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchFake = async () => {
  console.log("in actual fetch fn");
  const res = await fetch("https:/fake-website.com");
  const data = await res?.json();
  return res;
};

export default function FakeComponent() {
  const [retryAttempt, setRetryAttempt] = useState(0);
  const { data, isLoading, error } = useQuery({
    queryKey: ["fake"],
    queryFn: fetchFake,
    retry: 3,
    retryDelay: (attempt) => {
      setRetryAttempt(attempt);
      console.log("atte,pting no : ", attempt);
      return 3000;
    },
  });
  if (error) {
    return "Something went wrong please try after sometime.";
  }
  return (
    <div className="p-5">
      <h2>
        Simulating fake fetch in case it fails and how to handle erros loding
        retires and all. see console it would shoing retries and eventualy fail
        after 3 times.
      </h2>
      <div className="data mt-5">
        {isLoading ? (
          <p className="animate-pulse">Loading...</p>
        ) : (
          <div className="res">data is here....</div>
        )}
      </div>
    </div>
  );
}
