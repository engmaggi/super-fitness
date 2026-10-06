import { useState } from "react";
import { MEAL_TYPES } from "../constants/meal-types";
import { MealsCards } from "./meals-cards";   
import {  Dumbbell } from "lucide-react";
import { OutlineWord } from "@/components/outline-word";
import mealsBg from "@/features/home/meals-section/assets/meals-bg.jpg";
import { useTranslation } from "react-i18next";

export function MealsSection() {
   const { t } = useTranslation();
  const [selected, setSelected] = useState<string>(MEAL_TYPES[0].id);

  
  return (
  <section
  style={{ backgroundImage: `url(${mealsBg})` }}
  className="relative m-0 flex w-full flex-col justify-center overflow-x-clip bg-cover bg-center bg-no-repeat px-0 pt-16 text-center md:mb-40">
  <div
    className="absolute inset-x-0 top-1/2 h-2/3 -translate-y-1/2 bg-black/20 backdrop-blur-[58px] md:top-75"
    aria-hidden="true"
  />

  {/* header */}
  <div className="relative flex flex-col items-center px-4 md:bottom-19">
    <OutlineWord>{t("meals.outlineWord")}</OutlineWord>

    <div className="mb-3 flex items-center gap-2">
      <Dumbbell className="size-4 text-primary" aria-hidden="true" />
      <p className="font-heading text-sm font-bold uppercase text-primary">
          {t("meals.eyebrow")}
      </p>
    </div>

    <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-extrabold uppercase text-white sm:text-3xl md:text-4xl">
      {t("meals.titleBefore")}{" "}
      <span className="text-primary">{t("meals.titleHighlight")}</span> {t("meals.titleAfter")}
    </h2>
  </div>

  {/* cards */}
  <div className="relative mx-4 my-10 grid grid-cols-1 gap-6 sm:mx-auto sm:w-full sm:max-w-md md:m-10 md:w-auto md:max-w-none md:grid-cols-3">
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

