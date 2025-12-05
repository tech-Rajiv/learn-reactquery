import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="px-5 py-3 flex justify-between  border-b ">
      <Link href={"/"}>
        <h2>CoinsApp</h2>
      </Link>
      <div className="btns flex gap-3">
        <Link href={"/about"} className="underline hover:text-blue-500">
          About
        </Link>
        <Link href={"/dashboard"} className="underline hover:text-blue-500">
          Dashboard
        </Link>
        <Link href={"/fake-fetch"} className="underline hover:text-blue-500">
          fake retry
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
