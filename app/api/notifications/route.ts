import { db } from "@/lib/db";
import { notifcationEmail } from "@/lib/mail";
import { NextResponse, NextRequest } from "next/server";

export interface LowStockItem {
  name: string;
  stock: number;
}

export async function GET(request: NextRequest) {
  // const authHeader = request.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response('Unauthorized', {
  //     status: 401,
  //   });
  // }

  const formatNotificationMessage = (lowStockItems: LowStockItem[]) => {
    let message = "The following inventory are below the stock threshold:\n";
    lowStockItems.forEach((item) => {
      message += `Name: ${item.name}, Stock: ${item.stock}\n`;
    });
    return message;
  };
  try {
    const lowStockItems = await db.inventory.findMany({
      where: {
        stock: {
          lt: 20,
        },
      },
      select: {
        name: true,
        stock: true,
      },
    });
    if (lowStockItems.length > 0) {
      const message = formatNotificationMessage(lowStockItems);
      const title = "Low stock alert";
      await notifcationEmail(lowStockItems);
      await db.notification.create({
        data: {
          title,
          message,
        },
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        success: true,
        message: "No low stock items found.",
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error sending notifications" });
  }
}
