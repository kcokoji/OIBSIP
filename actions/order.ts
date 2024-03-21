"use server";
import * as z from "zod";
import { OrderSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth";
import { currentRole } from "@/lib/auth";
import { OrderStatus, UserRole } from "@prisma/client";
import { orderNotifcationEmail, updateOrderNotifcationEmail } from "@/lib/mail";

interface OrderProps {
  id: string;
  status: OrderStatus;
  email: string;
}

export const order = async (
  values: z.infer<typeof OrderSchema>,
  reference: string
) => {
  const user = await currentUser();
  if (!user || !user.id || !user.email) {
    return { error: "Unauthorized or session not found" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  const validatedFields = OrderSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  if (!reference) {
    return { error: "Reference is required" };
  }
  const orderValues = validatedFields.data;
  const { base, sauce, cheese, veggies } = validatedFields.data;

  const itemsToFetch = [base, sauce, cheese];
  if (veggies) {
    itemsToFetch.push(veggies);
  }

  const inventoryItems = await db.inventory.findMany({
    where: { name: { in: itemsToFetch } },
  });

  const missingItem = inventoryItems.find((item) => !item || !item.stock);
  if (missingItem) {
    return {
      error:
        "One or more selected items not found in inventory or have nullish stock.",
    };
  }

  const updatePromises = inventoryItems.map((item) => {
    return db.inventory.updateMany({
      where: { id: item.id },
      data: { stock: { decrement: 1 } }, // Ensuring stock doesn't go below 0
    });
  });
  await Promise.all(updatePromises);

  const order = await db.order.create({
    data: { ...orderValues, reference, userId: user.id },
  });
  await orderNotifcationEmail(order.id, user.email, order.status);
  redirect("/orders");
};

export const orderStatus = async (values: OrderProps) => {
  const userRole = await currentRole();
  if (userRole !== UserRole.ADMIN) {
    return { error: "Unauthorized" };
  }

  const { id, status, email } = values;
  await db.order.update({ where: { id }, data: { status } });
  await updateOrderNotifcationEmail(id, email, status);
  revalidatePath("/admin");
  revalidatePath("/orders");
  return { success: "Order updated" };
};
