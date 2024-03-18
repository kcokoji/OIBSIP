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
  const userId = user?.id; // Access user.id safely using optional chaining
  if (!userId) {
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
  try {
    const { base, sauce, cheese, veggies } = validatedFields.data;

    const selectedBase = await db.inventory.findUnique({
      where: { name: base },
    });
    const selectedSauce = await db.inventory.findUnique({
      where: { name: sauce },
    });
    const selectedCheese = await db.inventory.findUnique({
      where: { name: cheese },
    });

    const selectedVeggies = await db.inventory.findUnique({
      where: { name: veggies },
    });

    if (
      !selectedBase?.stock ||
      !selectedSauce?.stock ||
      !selectedCheese?.stock ||
      !selectedVeggies?.stock
    ) {
      return {
        error:
          "One or more selected items not found in inventory or have nullish stock.",
      };
    }

    await db.inventory.update({
      where: { id: selectedBase.id },
      data: { stock: selectedBase.stock - 1 },
    });

    await db.inventory.update({
      where: { id: selectedSauce.id },
      data: { stock: selectedSauce.stock - 1 },
    });

    await db.inventory.update({
      where: { id: selectedCheese.id },
      data: { stock: selectedCheese.stock - 1 },
    });

    await db.inventory.update({
      where: { id: selectedVeggies.id },
      data: { stock: selectedVeggies.stock - 1 },
    });

    await db.order.create({
      //@ts-ignore
      data: {
        ...ordervalues,
        userId,
      },
    });
    revalidatePath("/admin", "layout");
  } catch (err) {
    return { error: "An unexpected error occured" };
  }
};

export const orderStatus = async (values: OrderProps) => {
  const userRole = await currentRole();

  if (userRole !== UserRole.ADMIN) {
    return { error: "Unauthorized" };
  }
  try {
    await db.order.update({
      where: { id: values.id },
      data: {
        status: values.status,
      },
    });
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/admin");
};
