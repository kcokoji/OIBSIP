import { PizzaInfo } from "@/data/pizza-info";

import PizzaCard from "./pizza-card";
import Header from "@/components/header";

export default function MenuInfo() {
  return (
    <div className="bg-[#f2eddc] py-8 ">
      <Header title="Menu" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center">
        {PizzaInfo.map((pizza) => (
          <PizzaCard key={pizza.name} {...pizza} />
        ))}
      </div>
    </div>
  );
}
