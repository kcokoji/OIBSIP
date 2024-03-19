"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Loader from "@/components/ui/loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { UpdateInventorySchema } from "@/schemas";
import { IngredientCategory, Inventory } from "@prisma/client";
import { UpdateInventory, deleteInventory } from "@/actions/inventory";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { MoreVertical } from "lucide-react";

export default function CellActions(data: Inventory) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateInventorySchema>>({
    resolver: zodResolver(UpdateInventorySchema),
    defaultValues: {
      name: data.name,
      price: data.price.toString(),
      stock: data.stock.toString(),
      category: data.category,
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateInventorySchema>) => {
    startTransition(() => {
      UpdateInventory(values, data.id)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast.error(data.error);
          }
          if (data?.success) {
            setOpen(false);
            router.refresh();
            toast.info(data.success);
          }
        })
        .catch(() => {
          toast.error("Oops! Something went wrong!");
        });
    });
  };
  const onDelete = (id: string) => {
    startTransition(() => {
      deleteInventory(id)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            router.refresh();
            toast.info(data.success);
          }
        })
        .catch(() => {
          toast.error("Oops! Something went wrong!");
        });
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit inventory</DialogTitle>
          <DialogDescription>
            Make changes to this inventory.Click update when done to save
            changes.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-2 py-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="e.g Chicken"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₦)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="$$$$$"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="amount"
                        type="number"
                        pattern="^[0-9]*$"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={IngredientCategory.BASE}>
                          {IngredientCategory.BASE}
                        </SelectItem>
                        <SelectItem value={IngredientCategory.CHEESE}>
                          {IngredientCategory.CHEESE}
                        </SelectItem>
                        <SelectItem value={IngredientCategory.MEAT}>
                          {IngredientCategory.MEAT}
                        </SelectItem>
                        <SelectItem value={IngredientCategory.SAUCE}>
                          {IngredientCategory.SAUCE}
                        </SelectItem>
                        <SelectItem value={IngredientCategory.VEGGIES}>
                          {IngredientCategory.VEGGIES}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex items-center justify-between flex-row">
              <Button type="submit" size="lg" disabled={isPending}>
                {isPending ? (
                  <Loader size={24} color="white" />
                ) : (
                  <span>Update</span>
                )}
              </Button>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  size="lg"
                  disabled={isPending}
                  onClick={() => onDelete(data.id)}
                >
                  {isPending ? (
                    <Loader size={24} color="white" />
                  ) : (
                    <span>Delete</span>
                  )}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
