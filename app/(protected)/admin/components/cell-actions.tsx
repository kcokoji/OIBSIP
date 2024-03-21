"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useTransition, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreVertical } from "lucide-react";
import { Order } from "./columns";
import { orderStatus } from "@/actions/order";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";
import { StatusSchema } from "@/schemas";
import { OrderStatus } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function CellActions({ data }: { data: Order }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof StatusSchema>>({
    resolver: zodResolver(StatusSchema),
    defaultValues: {
      status: data.status || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof StatusSchema>) => {
    const status = {
      id: data.id,
      status: values.status,
      email: data.email,
    };
    startTransition(() => {
      orderStatus(status)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          setOpen(false);
          toast.info(data.success);
        })
        .catch(() => toast.error("Oops! Something went wrong!"));
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

              <Button
                size="sm"
                className="mr-2"
                onClick={() => window.print()}
                variant="secondary"
              >
                Print
              </Button>
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
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <section className="mt-6 border-t pt-6 space-y-4">
              <h1 className="text-xl text-center font-semibold">
                Order Status
              </h1>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-black ml-2">
                  {capitalizeFirstLetter(data.status)}
                </h3>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Update" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={OrderStatus.PROCESSING}>
                            Processing
                          </SelectItem>
                          <SelectItem value={OrderStatus.READY}>
                            Ready
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <Loader size={24} color="white" />
                ) : (
                  <h2>Update</h2>
                )}
              </Button>
            </section>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
