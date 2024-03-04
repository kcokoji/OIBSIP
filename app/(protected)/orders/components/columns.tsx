"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";
import CellActions from "./cell-actions";

export type Order = {
  pizzaName: string | null;
  pizzaPrice: string;
  status: string;
  createdAt: string;
  reference: string;
  base: string;
  cheese: string;
  veggies: string | undefined;
  sauce: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "pizzaName",
    header: "Pizza Name",
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      let variant;
      switch (status) {
        case "PROCESSING":
          variant = "secondary";
          break;
        case "SHIPPED":
          variant = "default";
          break;
      }

      return (
        <div className="ml-2">
          {/* @ts-ignore */}
          <Badge variant={variant}>{capitalizeFirstLetter(status)}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "reference",
    header: "Reference",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Details",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
