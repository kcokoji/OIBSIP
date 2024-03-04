import React from "react";
import Header from "@/components/header";
import { getCustomers } from "@/data/admin";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import Container from "@/components/container";

export default async function CustomerPage() {
  const customers = await getCustomers();

  return (
    <div>
      <Header title="Customers" />
      <div className="px-6">
        <DataTable data={customers} columns={columns} searchKey="name" />
      </div>
    </div>
  );
}
