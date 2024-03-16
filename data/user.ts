import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};
export const getSubscriberEmail = async (email: string) => {
  try {
    const user = await db.subscribedEmail.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getOrderByUserId = async (userId: string | undefined) => {
  try {
    const userOrders = await db.order.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });
    return userOrders;
  } catch {
    return [];
  }
};
