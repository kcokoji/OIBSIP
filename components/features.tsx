"use client";
import { CookingPot, HandCoins, NotepadText, Pizza, Truck } from "lucide-react";
import SubHeading from "./sub-heading";

export default function Features() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <SubHeading title=" How It Works" />
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Enjoy the convenience of our pizza delivery service. It&apos;s as
              easy as pie!
            </p>
          </div>
          <div className="grid md:grid-cols-3 md:gap-8 gap-6 items-start py-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full  bg-primary/10 dark:border-gray-800">
                <NotepadText className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Create your pizza</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Craft your ideal pizza using our intuitive customization tool.
                Select your preferred crust, sauce, toppings, and cheese to
                tailor your pizza to perfection.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full  bg-primary/10 dark:border-gray-800">
                <HandCoins className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Place an order</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Once you&#39;ve finalized your order, proceed to checkout. You
                can choose to pay securely online using your preferred payment
                method.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full  bg-primary/10 dark:border-gray-800">
                <Truck className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Delivery</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Your pizza is on the way! We package it with care and deliver it
                to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
