"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  name: string;
  email: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Customer Id",
  },
  {
    accessorKey: "name",
    header: " Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
