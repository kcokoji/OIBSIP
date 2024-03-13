import { getInventory } from "@/data/admin";
import { DataTable } from "../components/data-table";
import Header from "@/components/header";
import CreateButton from "./components/create-button";
import { columns } from "./components/columns";

export default async function InventoryPage() {
  const data = await getInventory();

  return (
    <div>
      <Header title="Inventory" />
      <div className="px-6">
        <div className="flex items-center justify-center p-4">
          <CreateButton />
        </div>
        <DataTable data={data} columns={columns} searchKey="name" />
      </div>
    </div>
  );
}
