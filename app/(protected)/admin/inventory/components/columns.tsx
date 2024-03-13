"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CellActions from "./cell-actions";
import { Inventory } from "@prisma/client";
import { capitalizeFirstLetter, convertPrice } from "@/lib/utils";

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
    header: "Details",
    cell: ({ row }) => <CellActions {...row.original} />,
  },
];
