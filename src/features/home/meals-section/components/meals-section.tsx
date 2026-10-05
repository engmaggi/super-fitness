import { useState } from "react";
import { MEAL_TYPES } from "../constants/meal-types";
import { MealsCards } from "./meals-cards";   // use your real file name
import {  DumbbellIcon } from "lucide-react";

export function MealsSection() {
  const [selected, setSelected] = useState<string>(MEAL_TYPES[0].id);

  // const selectedType = MEAL_TYPES.find((m) => m.id === selected);

  return (
    <section className="px-6 py-16 text-center">
      <h2
  className="font-heading text-4xl leading-[1.2] font-bold uppercase text-white/5 md:text-5xl lg:text-[64px] [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] mask-[linear-gradient(177.84deg,black_-10%,transparent_71%)]"
>
  Healthy
</h2>
      <p className="text-sm text-primary"><DumbbellIcon/>Healthy Nutritions</p>

      <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold uppercase md:text-4xl">
        Fuel your fitness journey with customized{" "}
        <span className="text-primary">meal plans</span> for you
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {MEAL_TYPES.map((meal) => (
          <MealsCards
            key={meal.id}
            meal={meal}
            isActive={selected === meal.id}
            onSelect={setSelected}
          />
        ))}
      </div>

      
    </section>
  );
}