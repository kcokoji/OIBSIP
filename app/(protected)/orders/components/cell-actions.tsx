"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreVertical } from "lucide-react";
import { Order } from "./columns";

export default function CellActions({ data }: { data: Order }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <div className="">
          <DialogHeader className="text-lg font-semibold border-b space-y-4 px-2 pb-4">
            <div className="flex justify-between">
              <DialogTitle className="text-xl">Order Receipt</DialogTitle>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Reference ID: {data.reference}
            </p>
          </DialogHeader>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Pizza </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {data.pizzaName}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Base</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {data.base}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Sauce</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {data.sauce}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Cheese</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {data.cheese}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Veggies</p>
            </div>
            {data.veggies ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {data.veggies}
              </p>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                No veggies
              </p>
            )}
          </div>

          <hr className="border-t border-gray-200 dark:border-gray-800" />
          <div className="flex justify-between font-medium">
            <p>Total</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {data.pizzaPrice}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
