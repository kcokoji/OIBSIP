"use client";
import {
  BellRing,
  CandlestickChart,
  CookingPot,
  HandCoins,
  NotepadText,
  ShieldCheck,
} from "lucide-react";
import SubHeading from "./sub-heading";

export default function Features() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <SubHeading title=" How It Works" />
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Enjoy the convenience of our pizza ordering system. No more
              waiting on long queues to place an order you can do it by
              yourself.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-6 place-items-center py-6">
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
                <BellRing className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Notification</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Receive notifications about your order status. You&#39;ll be
                notified when your order is confirmed, being prepared, and ready
                for pickup or delivery.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full  bg-primary/10 dark:border-gray-800">
                <ShieldCheck className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Admin controls</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Go to profile and switch to admin profile to access advanced
                controls. Manage orders, view analytics, and update customer
                orders with ease.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full  bg-primary/10 dark:border-gray-800">
                <CandlestickChart className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Analytics</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Gain insights into your business with detailed analytics of
                orders. Track sales, inventory, and customer preferences to
                optimize your pizza offerings.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:border-gray-800">
                <CookingPot className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Order Tracking</h3>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Keep track of your order every step of the way. From start to
                finish, you&#39;ll know exactly where your pizza is and when
                it&#39;s expected to be ready.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
