import Footer from "@/components/footer";
import Header from "@/components/header";
import Navbar from "@/components/navbar";

import { redirect } from "next/navigation";

import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { getOrderByUserId } from "@/data/user";
import { formatOrderData } from "@/lib/utils";
import Container from "@/components/container";
import { currentUser } from "@/lib/auth";

export default async function OrderPage() {
  const user = await currentUser();
  const userId = user?.id;
  if (!user && !userId) {
    redirect("/login");
  }

  const userOrders = await getOrderByUserId(userId);
  const formattedOrders = formatOrderData(userOrders);

  return (
    <div>
      <Navbar />

      <div className="bg-[#f2eddc] py-8 min-h-screen">
        <Header title="Orders" />
        <Container>
          <DataTable columns={columns} data={formattedOrders} />
        </Container>
      </div>
      <Footer />
    </div>
  );
}
