import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Inventory, Order } from "@prisma/client";
import { PizzaInfo } from "@/data/pizza-info";
import { formatDistanceToNow } from "date-fns";

interface AdminOrder {
  id: string;
  user: {
    name: string;
    email: string;
  };
  status: "PROCESSING" | "SHIPPED";
  createdAt: Date;
  reference: string;
  pizzaId: number;
  base: string;
  sauce: string;
  veggies?: string;
  cheese: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertPrice = (price: number | undefined): string => {
  const formattedPrice =
    price?.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
    }) || "N/A";
  return formattedPrice !== null ? formattedPrice : "N/A";
};

export function formatOrderData(orders: Order[] | null) {
  if (!orders || orders.length === 0) return [];

  return orders.map((order) => {
    const pizza = getPizzaById(order.pizzaId);
    return {
      pizzaName: pizza?.name || null,
      pizzaPrice: convertPrice(pizza?.price),
      base: order.base,
      cheese: order.cheese,
      sauce: order.sauce,
      veggies: order.veggies,
      status: order.status,
      createdAt: formatDateString(order.createdAt),
      reference: order.reference,
    };
  });
}

function getPizzaById(pizzaId: number) {
  const pizza = PizzaInfo.find((pizza) => pizza.id === pizzaId);
  return pizza ? { name: pizza.name, price: pizza.basePrice } : null;
}

export function formatDateString(dateString: Date) {
  const options = { month: "long", day: "numeric", year: "numeric" } as const;
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

export function formatAdminOrderData(orders: AdminOrder[]) {
  if (!orders || orders.length === 0) return [];

  return orders.map((order) => {
    const pizza = getPizzaById(order.pizzaId);
    return {
      id: order.id,
      name: order.user.name,
      email: order.user.email,
      status: order.status,
      createdAt: formatDistanceToNow(new Date(order.createdAt), {
        addSuffix: true,
      }),
      reference: order.reference,
      pizzaName: pizza?.name,
      pizzaPrice: convertPrice(pizza?.price),
      base: order.base,
      cheese: order.cheese,
      veggies: order.veggies,
      sauce: order.sauce,
    };
  });
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
