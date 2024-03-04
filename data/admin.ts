import { auth } from "@/auth";
import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const getOrders = async () => {
  const userRole = await currentRole();
  if (userRole !== UserRole.ADMIN) {
    return null;
  }
  try {
    const order = await db.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return order;
  } catch {
    return null;
  }
};

export const countProcessingOrders = async () => {
  const userRole = await currentRole();

  if (userRole !== UserRole.ADMIN) {
    return null;
  }
  try {
    const processingOrdersCount = await db.order.count({
      where: {
        status: "PROCESSING",
      },
    });
    return processingOrdersCount;
  } catch (error) {
    return null;
  }
};

export const getCustomers = async () => {
  const userRole = await currentRole();

  if (userRole !== UserRole.ADMIN) {
    return null;
  }
  try {
    const user = await db.user.findMany({
      where: {
        order: {
          some: {},
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getInventory = async () => {
  const userRole = await currentRole();

  if (userRole !== UserRole.ADMIN) {
    return null;
  }
  try {
    const inventory = await db.inventory.findMany();
    return inventory;
  } catch {
    return null;
  }
};
