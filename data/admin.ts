import { PizzaInfo } from "./pizza-info";
import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { Order, UserRole } from "@prisma/client";

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
      orderBy: {
        emailVerified: "desc",
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
    const inventory = await db.inventory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return inventory;
  } catch {
    return null;
  }
};

export const getSalesCount = async () => {
  try {
    const salesCount = await db.order.count();

    return salesCount;
  } catch (error) {
    console.error("[GET_SALES_COUNT]", error);
    return 0;
  }
};

export const getInventoryCount = async () => {
  try {
    const inventoryItems = await db.inventory.findMany();

    const totalStock = inventoryItems.reduce(
      (acc, item) => acc + item.stock,
      0
    );

    return totalStock;
  } catch (error) {
    console.error("[GET_INVENTORY_COUNT]", error);
    return 0;
  }
};

const calculateOrderPrice = (order: Order) => {
  const pizza = PizzaInfo.find((pizza) => pizza.id === order.pizzaId);

  if (!pizza) {
    console.error(`Pizza not found for order with pizzaId ${order.pizzaId}`);
    return 0;
  }

  // Add any additional logic to calculate price based on toppings, sauce, etc.
  // For simplicity, let's assume a fixed price per order in this example
  const orderPrice = pizza.basePrice;
  return orderPrice;
};

export const getTotalRevenue = async () => {
  try {
    const orders = await db.order.findMany();

    const totalRevenue = orders.reduce(
      (acc, order) => acc + calculateOrderPrice(order),
      0
    );

    return totalRevenue;
  } catch (error) {
    console.error("[GET_ANALYTICS]", error);
    return 0;
  }
};

export const getGraphRevenue = async () => {
  try {
    const orders = await db.order.findMany();

    const monthlyRevenue: Record<number, number> = {};

    for (const order of orders) {
      const month = order.createdAt.getMonth();
      let revenueForOrder = 0;

      // Assuming pizzaId is a field in the Order model
      const pizza = PizzaInfo.find((pizza) => pizza.id === order.pizzaId);

      if (pizza) {
        revenueForOrder += pizza.basePrice || 0;
      }

      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const graphData = Array.from({ length: 12 }, (_, month) => ({
      name: monthToMonthName(month),
      total: monthlyRevenue[month] || 0,
    }));

    return graphData;
  } catch (error) {
    console.error("[GET_GRAPH_REVENUE]", error);
    return [];
  }
};

// Helper function to convert month index to month name
const monthToMonthName = (month: number): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames[month];
};
