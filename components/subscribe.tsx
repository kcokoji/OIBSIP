"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { SubscribeSchema } from "@/schemas";
import { toast } from "sonner";
import { subscribe } from "@/actions/subscribe";
import Loader from "./ui/loader";
import SubHeading from "./sub-heading";

export default function Subscribe() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SubscribeSchema>>({
    resolver: zodResolver(SubscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SubscribeSchema>) => {
    startTransition(() => {
      subscribe(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          } else {
            toast.success(data?.success);
            form.reset();
          }
        })
        .catch(() => toast.error("Oops! Something went wrong!"));
    });
  };

  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <SubHeading title="Get Exclusive Offers" />
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Sign up for our newsletter to receive special deals, coupons, and
              the latest updates.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2 py-6 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter your email"
                          type="email"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isPending} size="lg" type="submit">
                  {" "}
                  {isPending ? (
                    <Loader size={24} color="white" />
                  ) : (
                    <span>Subscribe</span>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
