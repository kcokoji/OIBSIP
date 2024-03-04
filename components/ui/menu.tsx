/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ok18J73Nxd9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MenuForm() {
  return (
    <div
      key="1"
      className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start  px-4 mx-auto py-6 bg-[#f2eddc]"
    >
      <div className="grid gap-4 items-start">
        <div className="grid gap-2">
          <h1 className="font-bold text-3xl lg:text-4xl">
            Create Your Own Pizza
          </h1>
          <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
            Choose your size, toppings, sauce, and crust
          </p>
        </div>
        <form className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="size">
              Size
            </Label>
            <RadioGroup
              className="flex items-center gap-2"
              defaultValue="medium"
              id="size"
            >
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-white dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-small"
              >
                <RadioGroupItem id="size-small" value="small" />
                Small
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-medium"
              >
                <RadioGroupItem id="size-medium" value="medium" />
                Medium
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-large"
              >
                <RadioGroupItem id="size-large" value="large" />
                Large
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="toppings">
              Toppings
            </Label>
            <RadioGroup
              className="flex flex-wrap gap-4"
              defaultValue="pepperoni"
              id="toppings"
            >
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="topping-pepperoni"
              >
                <RadioGroupItem id="topping-pepperoni" value="pepperoni" />
                Pepperoni
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="topping-mushrooms"
              >
                <RadioGroupItem id="topping-mushrooms" value="mushrooms" />
                Mushrooms
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="topping-onions"
              >
                <RadioGroupItem id="topping-onions" value="onions" />
                Onions
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="topping-sausage"
              >
                <RadioGroupItem id="topping-sausage" value="sausage" />
                Sausage
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="topping-bacon"
              >
                <RadioGroupItem id="topping-bacon" value="bacon" />
                Bacon
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="sauce">
              Sauce
            </Label>
            <RadioGroup
              className="flex items-center gap-2"
              defaultValue="marinara"
              id="sauce"
            >
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="sauce-marinara"
              >
                <RadioGroupItem id="sauce-marinara" value="marinara" />
                Marinara
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="sauce-alfredo"
              >
                <RadioGroupItem id="sauce-alfredo" value="alfredo" />
                Alfredo
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="sauce-bbq"
              >
                <RadioGroupItem id="sauce-bbq" value="bbq" />
                BBQ
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="crust">
              Crust
            </Label>
            <RadioGroup
              className="flex items-center gap-2"
              defaultValue="thin"
              id="crust"
            >
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="crust-thin"
              >
                <RadioGroupItem id="crust-thin" value="thin" />
                Thin
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="crust-thick"
              >
                <RadioGroupItem id="crust-thick" value="thick" />
                Thick
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="crust-stuffed"
              >
                <RadioGroupItem id="crust-stuffed" value="stuffed" />
                Stuffed
              </Label>
            </RadioGroup>
          </div>
          <Button size="lg">Order Now</Button>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/img/pizza.png"
          width={350}
          height={350}
          className="w-fit h-fit rounded-full"
          alt="hero-image"
          priority
        />
      </div>
    </div>
  );
}
