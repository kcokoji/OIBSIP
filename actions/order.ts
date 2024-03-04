"use server";

import * as z from "zod";

import { OrderSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";

import { currentRole } from "@/lib/auth";
import { OrderStatus, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface OrderProps {
  id: string;
  status: OrderStatus;
}

export const order = async (values: z.infer<typeof OrderSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized!" };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return { error: "Unauthorized!" };
  }
  const validatedFields = OrderSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const ordervalues = validatedFields.data;

  // Update inventory based on the order
  await db.inventory.update({
    where: {
      id: "65d7a0a45f7498043c1569ce",
    },
    data: {
      base: { decrement: 1 },
      sauce: { decrement: 1 },
      cheese: { decrement: 1 },
      veggies: { decrement: ordervalues.veggies ? 1 : 0 },
      meat: { decrement: 1 },
    },
  });

  await db.order.create({
    //@ts-ignore
    data: {
      ...ordervalues,
      userId: user.id,
    },
  });
  revalidatePath("/admin", "layout");
  redirect("/orders");
};

export const orderStatus = async (values: OrderProps) => {
  const userRole = await currentRole();

  if (userRole !== UserRole.ADMIN) {
    return { error: "Unauthorized" };
  }
  await db.order.update({
    where: { id: values.id },
    data: {
      status: values.status,
    },
  });
  revalidatePath("/admin");
};
