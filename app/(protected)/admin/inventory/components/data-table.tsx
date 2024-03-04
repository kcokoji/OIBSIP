"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { StockSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Inventory } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DataTableProps {
  data: Inventory[] | null;
}

interface props {
  label: "base" | "sauce" | "cheese" | "veggies" | "meat";
  value: number | null;
}

const DataRow = ({ label, value }: props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof StockSchema>>({
    resolver: zodResolver(StockSchema),
    defaultValues: {
      base: undefined,
      cheese: undefined,
      veggies: undefined,
      meat: undefined,
      sauce: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof StockSchema>) => {
    // startTransition(() => {
    //   login(values, calLbackUrl)
    //     .then((data) => {
    //       if (data?.error) {
    //         form.reset();
    //         setError(data.error);
    //       }
    //     })
    //     .catch(() => setError("Something went wrong!"));
    // });
    console.log(values);
  };

  return (
    <TableRow key={label}>
      <TableCell>{label}</TableCell>
      <TableCell>{value !== null ? value.toString() : "N/A"}</TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[400px]">
            <DialogHeader>
              {" "}
              <DialogTitle>Update Stock</DialogTitle>
              <DialogDescription>
                Make changes to your Stock here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name={label}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Quantity of stock"
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default function DataTable({ data }: DataTableProps) {
  // Check if data is not null and if it has at least one item
  if (!data || data.length === 0) return null;

  const firstItem = data[0]; // Get the first item from the array

  const rows = [
    { label: "Base", value: firstItem.base },
    { label: "Sauce", value: firstItem.sauce },
    { label: "Cheese", value: firstItem.cheese },
    { label: "Veggies", value: firstItem.veggies },
    { label: "Meat", value: firstItem.meat },
  ];

  return (
    <div className="px-4">
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <DataRow key={index} {...row} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
