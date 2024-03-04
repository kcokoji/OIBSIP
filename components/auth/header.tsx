import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

import React from "react";

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3 items-center justify-center">
      <div>
        <Link href="/">
          <Image
            src="/img/logo.png"
            width={40}
            height={40}
            alt="logo"
            className="w-auto   h-auto"
            priority
          />
        </Link>
      </div>
      <h1 className=" text-2xl font-semibold">{label}</h1>
    </div>
  );
};
