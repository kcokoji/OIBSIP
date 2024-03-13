import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/header";
import {
  getGraphRevenue,
  getInventoryCount,
  getSalesCount,
  getTotalRevenue,
} from "@/data/admin";
import { Banknote, CreditCard, Layers } from "lucide-react";
import { convertPrice } from "@/lib/utils";
import { Overview } from "./components/overview";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function AnalyticsPage() {
  const totalSales = await getSalesCount();
  const stockCount = await getInventoryCount();
  const totalRevenue = await getTotalRevenue();
  const formattedTotalRevenue = convertPrice(totalRevenue!);
  const data = await getGraphRevenue();

  return (
    <>
      <div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Header title="Analytics" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <Banknote className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formattedTotalRevenue}
                </div>
                <p className="text-xs text-teal-500">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Inventory
                </CardTitle>
                <Layers className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stockCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sales
                </CardTitle>
                <CreditCard className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{totalSales}</div>
                <p className="text-xs  text-teal-500">+19% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={data} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
