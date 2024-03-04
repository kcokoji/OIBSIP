"use client";

import * as z from "zod";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { convertPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { OrderSchema } from "@/schemas";

import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { FlutterWaveProps } from "flutterwave-react-v3/dist/types";

import { useCurrentUser } from "@/hooks/use-current-user";

import { toast } from "sonner";
import { order } from "@/actions/order";
import { ChevronDownIcon } from "lucide-react";

interface PizzaProps {
  id: number;
  name: string;
  description: string;
  basePrice: number;
}

export default function PizzaCard(pizza: PizzaProps) {
  const formattedPrice = convertPrice(pizza.basePrice);

  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const email = user?.email;
  const name = user?.name;

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      pizzaId: pizza.id,
      base: undefined,
      sauce: undefined,
      cheese: undefined,
      veggies: undefined,
    },
  });
  const public_key = process.env.NEXT_PUBLIC_TEST_KEY;

  const config: FlutterWaveProps = {
    public_key,
    tx_ref: Date.now().toString(),
    amount: pizza.basePrice,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      //@ts-ignore
      email: email,
      //@ts-ignore
      name: name,
    },
    customizations: {
      title: "Pizzeria",
      description: `Payment for ${pizza.name}`,
      logo: "https://utfs.io/f/3f36caf5-988a-409f-bd95-578742f10c3e-1zbfv.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const onSubmit = (values: z.infer<typeof OrderSchema>) => {
    handleFlutterPayment({
      callback: (response) => {
        const reference = response.tx_ref;
        const orderValues = { ...values, reference: reference };
        if (response.status !== "completed") {
          toast.error("Failed Transaction");
        }
        startTransition(() => {
          order(orderValues).then((data) => {
            if (data?.error) {
              form.reset();
              toast.error(data?.error);
            }
            closePaymentModal();
            toast.success("Order Created!");
          });
        });
      },
      onClose: () => {
        toast.error("Transaction Canceled");
      },
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild className=" cursor-pointer">
        <Card className="w-[350px] bg-inherit border-none shadow-none group">
          <CardHeader className="flex justify-center items-center">
            <Image
              src="/img/pizza.png"
              width={130}
              height={130}
              className="w-fit h-fit rounded-full group-hover:scale-95 duration-300 transition-all ease-in-out shadow-md"
              alt={pizza.name}
              priority
            />
          </CardHeader>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">{pizza.name}</h2>
            <p className="text-base leading-none text-gray-700 dark:text-gray-400">
              {pizza.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <h2 className="text-base font-bold">{formattedPrice}</h2>
            <Button>Select</Button>
          </CardFooter>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-3 place-items-center p-6 gap-4 lg:gap-10 max-h-[85vh] overflow-auto"
          >
            <DrawerClose asChild className="absolute top-8 left-4">
              <Button
                variant="outline"
                size="icon"
                className="shadow-xl rounded-full border-0"
              >
                <ChevronDownIcon className="h-8 w-8" />
              </Button>
            </DrawerClose>
            <div className="flex justify-center items-center">
              <Image
                src="/img/pizza.png"
                width={300}
                height={300}
                className="w-fit h-fit rounded-full group-hover:scale-95 duration-300 transition-all ease-in-out shadow-md"
                alt={pizza.name}
                priority
              />
            </div>
            <div className="mx-auto w-full">
              <DrawerHeader>
                <DrawerTitle className="md:text-xl lg:text-2xl text-lg">
                  {pizza.name}
                </DrawerTitle>
                <DrawerDescription className=" text-sm lg:text-base">
                  {pizza.description}
                </DrawerDescription>
              </DrawerHeader>

              <div className="grid   place-content-center gap-4 md:gap-6   overflow-y-auto ">
                <FormField
                  control={form.control}
                  name="base"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <FormLabel className="text-base">Bases</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-2 flex-wrap "
                        >
                          <FormItem className="flex items-center gap-2 flex-wrap ">
                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="base-flat-bread"
                            >
                              <RadioGroupItem
                                id="base-flat-bread"
                                value="flat bread"
                              />
                              Flatbread
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="base-pita-bread"
                            >
                              <RadioGroupItem
                                id="base-pita-bread"
                                value="pita bread"
                              />
                              Pita Bread
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="wheat"
                            >
                              <RadioGroupItem id="wheat" value="wheat" />
                              Wheat
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="base-classic"
                            >
                              <RadioGroupItem
                                id="base-classic"
                                value="classic"
                              />
                              Classic
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="york"
                            >
                              <RadioGroupItem id="york" value="york" />
                              york
                            </Label>
                            <FormMessage />
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sauce"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <FormLabel className="text-base">Sauces</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center gap-2"
                        >
                          <FormItem className="flex gap-2 flex-wrap ">
                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="sauce-pesto"
                            >
                              <RadioGroupItem id="sauce-pesto" value="pesto" />
                              Pesto
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="sauce-alfredo"
                            >
                              <RadioGroupItem
                                id="sauce-alfredo"
                                value="alfredo"
                              />
                              Alfredo
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="sauce-barbecue"
                            >
                              <RadioGroupItem
                                id="sauce-barbecue"
                                value="Barbecue"
                              />
                              Barbecue
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="Olive"
                            >
                              <RadioGroupItem id="Olive" value="olive" />
                              Olive
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="sauce-garlic"
                            >
                              <RadioGroupItem
                                id="sauce-garlic"
                                value="new york"
                              />
                              Garlic
                            </Label>
                            <FormMessage />
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cheese"
                  render={({ field }) => (
                    <div className="grid gap-2">
                      <FormLabel className="text-base">Cheese</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center gap-2"
                        >
                          <FormItem className="flex gap-2 flex-wrap ">
                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="cheese-mozzarella"
                            >
                              <RadioGroupItem
                                id="cheese-mozzarella"
                                value="mozzarella"
                              />
                              Mozzarella
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="parmesan"
                            >
                              <RadioGroupItem id="parmesan" value="parmesan" />
                              Parmesan
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="cheddar"
                            >
                              <RadioGroupItem id="cheddar" value="cheddar" />
                              Cheddar
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="feta-cheese"
                            >
                              <RadioGroupItem id="feta-cheese" value="feta" />
                              Feta
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="ricotta-cheese"
                            >
                              <RadioGroupItem
                                id="ricotta-cheese"
                                value="ricotta"
                              />
                              Ricotta
                            </Label>
                            <FormMessage />
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="veggies"
                  render={({ field }) => (
                    <div className="grid gap-2 pb-10">
                      <FormLabel className="text-base">
                        Veggies(Optional*)
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center gap-2"
                        >
                          <FormItem className="flex gap-2 flex-wrap ">
                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="Mushrooms"
                            >
                              <RadioGroupItem
                                id="Mushrooms"
                                value="mushrooms"
                              />
                              Mushrooms
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="peppers"
                            >
                              <RadioGroupItem id="peppers" value="peppers" />
                              Peppers
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="spinach"
                            >
                              <RadioGroupItem id="spinach" value="spinach" />
                              Spinach
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="zucchini"
                            >
                              <RadioGroupItem id="zucchini" value="zucchini" />
                              Zucchini
                            </Label>

                            <Label
                              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                              htmlFor="jalapenos"
                            >
                              <RadioGroupItem
                                id="jalapenos"
                                value="jalapenos"
                              />
                              Jalapeños
                            </Label>
                            <FormMessage />
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )}
                />
              </div>
            </div>
            <DrawerFooter className="flex justify-center w-full  items-center absolute bottom-0  lg:w-fit lg:right-10">
              <DrawerClose asChild>
                <Button type="submit" size="lg" className="shadow-xl w-full">
                  <span>Place an order</span>
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}