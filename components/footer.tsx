import React from "react";
import Container from "./container";
import Link from "next/link";

export default function Footer() {
  return (
    <Container className=" border-t py-3 lg:py-5 border-black bg-white ">
      <div className="text-lg font-semibold flex justify-center items-center ">
        Built with ❤️
        <Link
          href="https://byokoji.vercel.app"
          className="ml-2 underline text-primary"
        >
          @Okoji Kelechi
        </Link>
      </div>
    </Container>
  );
}
