import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="p p-3 flex justify-between  text-xl border-b ">
      <Link href={"/"}>
        <h2>CoinsApp</h2>
      </Link>
      <div className="btns flex gap-5">
        <Link href={"/about"} className="underline hover:text-blue-500">
          About
        </Link>
        <Link href={"/dashboard"} className="underline hover:text-blue-500">
          Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
