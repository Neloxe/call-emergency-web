"use client";

import { PredictionsOverview } from "@/components/predictionsOverview";
import { Text } from "@/components/text";
import { getData } from "@/utils/get-data";
import { useModel } from "@/components/model-context";

export default function Home() {
  const { selectedModel } = useModel();
  const data = getData(selectedModel, 10);
  // const data_week = getData(selectedModel, 7);
  // const data_day = getData(selectedModel, 1);

  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      {/* <PredictionsOverview
        data={data}
        className="col-span-12 xl:col-span-12"
        title="Prédictions"
      />
      <PredictionsOverview
        data={data_week}
        className="col-span-12 xl:col-span-12"
        title="Prédiction sur la semaine"
      />
      <PredictionsOverview
        data={data_day}
        className="col-span-12 xl:col-span-8"
        title="Prédiction sur la journée"
      />
      <Text
        className="col-span-12 xl:col-span-4"
        title="Informations"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error expedita officia, necessitatibus asperiores sit repellat exercitationem unde eum dolores facere quod eveniet quasi, eos delectus eius corrupti excepturi illum! Facere."
      /> */}
    </div>
  );
}
