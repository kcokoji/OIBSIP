"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellActions from "./cell-actions";
import { Inventory } from "@prisma/client";
import { convertPrice } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Format the amount as a dollar amount
      const formatted = convertPrice(price);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    header: "Edit",
    cell: ({ row }) => <CellActions {...row.original} />,
  },
];
