import { PizzaInfo, getInventory } from "@/data/pizza-info";

import PizzaCard from "./pizza-card";
import Header from "@/components/header";
import { currentUser } from "@/lib/auth";

export default async function MenuInfo() {
  const bases = await getInventory("BASE");
  const sauces = await getInventory("SAUCE");
  const cheeses = await getInventory("CHEESE");
  const veggies = await getInventory("VEGGIES");
  const user = await currentUser();

  return (
    <div className="bg-[#f2eddc] py-8 ">
      <Header title="Menu" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
        {PizzaInfo.map((pizza) => (
          <PizzaCard
            key={pizza.name}
            pizza={pizza}
            bases={bases}
            sauces={sauces}
            cheeses={cheeses}
            veggies={veggies}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
