"use server";

import { InventorySchema, UpdateInventorySchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";

export const createInventory = async (
  values: z.infer<typeof InventorySchema>
) => {
  const userRole = await currentRole();
  if (userRole !== UserRole.ADMIN) {
    return { error: "Unauthorized" };
  }
  const validatedFields = InventorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name, stock, price, category } = validatedFields.data;
  const NumPrice = parseFloat(price);
  const NumStock = parseInt(stock);

  try {
    await db.inventory.create({
      data: {
        name,
        stock: NumStock,
        price: NumPrice,
        category,
      },
    });

    revalidatePath("/dashboard", "layout");
    return {
      success: `Inventory created`,
    };
  } catch (err) {
    return { error: "Unexpected error occured" };
  }
};
export const UpdateInventory = async (
  values: z.infer<typeof UpdateInventorySchema>,
  id: string
) => {
  const userRole = await currentRole();
  if (userRole !== UserRole.ADMIN) {
    return { error: "Unauthorized" };
  }
  const validatedFields = UpdateInventorySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { name, stock, price, category } = validatedFields.data;
  const NumPrice = parseFloat(price!);
  const NumStock = parseInt(stock!);

  try {
    await db.inventory.update({
      where: {
        id,
      },
      data: {
        name,
        stock: NumStock,
        price: NumPrice,
        category,
      },
    });

    revalidatePath("/dashboard", "layout");
    return {
      success: `Inventory updated`,
    };
  } catch (err) {
    return { error: "Unexpected error occured" };
  }
};

export const deleteInventory = async (id: string) => {
  const userRole = await currentRole();
  if (userRole !== UserRole.ADMIN) {
    return { error: "Unauthorized" };
  }
  try {
    await db.inventory.delete({
      where: { id },
    });
    revalidatePath("/dashboard", "layout");
    return {
      success: "Inventory deleted",
    };
  } catch (err) {
    return { error: "Unexpected error occured" };
  }
};
