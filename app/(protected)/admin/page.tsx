import { columns } from "./components/columns";

import { getOrders } from "@/data/admin";

import { formatAdminOrderData } from "@/lib/utils";
import { DataTable } from "./components/data-table";
import { currentUser } from "@/lib/auth";
import Header from "@/components/header";

export default async function Component() {
  const orders = await getOrders();
  //@ts-ignore

  const formattedOrders = formatAdminOrderData(orders);

  return (
    <div>
      <Header title="Recent Orders" />

      <div className="px-6">
        <DataTable columns={columns} data={formattedOrders} searchKey="name" />
      </div>
    </div>
  );
}
