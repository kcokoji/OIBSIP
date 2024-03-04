"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CellActions from "./cell-actions";
import { OrderStatus } from "@prisma/client";
import { capitalizeFirstLetter } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  name: string;
  email: string;
  status: OrderStatus;
  createdAt: string;
  reference: string;
  pizzaName: string | undefined;
  pizzaPrice: number | undefined;
  base: string;
  cheese: string;
  veggies: string | undefined;
  sauce: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order Id",
  },
  {
    accessorKey: "name",
    header: "Customer",
  },
  {
    accessorKey: "email",
    header: "Email",
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
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    id: "actions",
    header: "Details",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
