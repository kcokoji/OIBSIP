import { getInventory } from "@/data/admin";

import DataTable from "./components/data-table";
import Header from "@/components/header";

export default async function InventoryPage() {
  const data = await getInventory();
  // console.log(data);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header title="Inventory" />
      <DataTable data={data} />
    </div>
  );
}
