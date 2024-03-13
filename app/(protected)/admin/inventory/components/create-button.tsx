"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { PlusCircle } from "lucide-react";

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
import { InventorySchema } from "@/schemas";
import { IngredientCategory } from "@prisma/client";
import { createInventory } from "@/actions/inventory";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof InventorySchema>>({
    resolver: zodResolver(InventorySchema),
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      category: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof InventorySchema>) => {
    startTransition(() => {
      createInventory(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast.error(data.error);
          }
          if (data?.success) {
            router.refresh();
            setOpen(false);
            toast.success(data.success);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
    console.log(values);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-1" /> Create{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an Inventory</DialogTitle>
          <DialogDescription>
            This inventory will be displayed on the menu page.
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
                    <FormLabel>Price</FormLabel>
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
                    {/* <FormDescription>
                You can manage email addresses in your{" "}
               
              </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader size={24} color="white" />
                ) : (
                  <span> Create</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
