import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Pizzeria | Best Pizza Delivery in Nigeria | Order Online for Fast & Fresh Pizzas!",
  description:
    "Created by Okoji Kelechi | Craving mouthwatering pizza? Pizzeria offers the best pizza delivery service in Nigeria. Order online for hot and fresh pizzas, made with quality ingredients and delivered to your doorstep. Satisfaction guaranteed!",
  keywords:
    "Pizza delivery, Pizzeria, Order pizza online, Best pizza in Nigeria, Hot pizza delivery, Fresh pizza, Quality ingredients, Pizza delivery service",
  authors: [{ name: "Okoji Kelechi Emeka", url: "https://byokoji.vercel.app" }],
  category: "Food",
  openGraph: {
    title:
      "Pizzeria | Best Pizza Delivery in Nigeria | Order Online for Fast & Fresh Pizzas!",
    description:
      "Created by Okoji Kelechi | Craving mouthwatering pizza? Pizzeria offers the best pizza delivery service in Nigeria. Order online for hot and fresh pizzas, made with quality ingredients and delivered to your doorstep. Satisfaction guaranteed!",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster richColors position="top-center" />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
