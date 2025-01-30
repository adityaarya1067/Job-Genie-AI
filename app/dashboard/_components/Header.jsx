"use client";
import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex p-4 items-center justify-between bg-white shadow-sm">
      {/* Adjusted logo size and added responsiveness */}
      <img src={"/logo.svg"} className="w-40 h-auto" alt="logo" />{" "}
      {/* Tailwind utility classes for responsive logo */}
      <ul className="hidden md:flex gap-6">
        {/* Dashboard link */}
        <li
          className={`cursor-pointer transition-all ${
            path === "/dashboard"
              ? "text-black font-bold"
              : "hover:text-orangeCustom hover:font-bold"
          }`}
        >
          Dashboard
        </li>

        {/* Questions link */}
        <li
          className={`cursor-pointer transition-all ${
            path === "/dashboard/Questions"
              ? "text-black font-bold"
              : "hover:text-orangeCustom hover:font-bold"
          }`}
        >
          Questions
        </li>

        {/* Upgrade link */}
        <li
          className={`cursor-pointer transition-all ${
            path === "/dashboard/Upgrade"
              ? "text-black font-bold"
              : "hover:text-orangeCustom hover:font-bold"
          }`}
        >
          Upgrade
        </li>

        {/* How it works link */}
        <li
          className={`cursor-pointer transition-all ${
            path === "/dashboard/how"
              ? "text-black font-bold"
              : "hover:text-orangeCustom hover:font-bold"
          }`}
        >
          How it Works?
        </li>
      </ul>
      {/* User button */}
      <UserButton />
    </div>
  );
}

export default Header;
