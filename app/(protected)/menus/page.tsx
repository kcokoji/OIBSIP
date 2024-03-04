import Footer from "@/components/footer";

import Navbar from "@/components/navbar";

import React from "react";
import MenuInfo from "./components/menu-info";

export default async function MenuPage() {
  return (
    <div>
      <Navbar />
      <MenuInfo />
      <Footer />
    </div>
  );
}
