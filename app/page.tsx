"use client";

import { useEffect, useState } from "react";
import { PredictionsOverview } from "@/components/predictionsOverview";
import { Text } from "@/components/text";
import { getData } from "@/utils/get-data";
import { useModel } from "@/components/model-context";
import { MessageError } from "@/components/messageError";
import { MessageLoading } from "@/components/messageLoading";

export default function Home() {
  const { selectedModel } = useModel();
  const [data, setData] = useState<{
    predictions: number[];
    reals: number[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (selectedModel) {
  //       setError(null);
  //       setData(null);
  //       setLoading(true);

  //       try {
  //         const fetchedData = await getData(10, selectedModel);
  //         setData(fetchedData);
  //       } catch (err) {
  //         console.error("Error fetching data:", err);
  //         setError("Impossible de récupérer les données.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [selectedModel]);

  if (error) {
    return <MessageError message={error} />;
  }

  if (loading) {
    return <MessageLoading />;
  }

  if (!data) {
    return <MessageLoading />;
  }

  console.log("Fetched data:", data);

  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      <PredictionsOverview
        data={data}
        className="col-span-12 xl:col-span-12"
        title="Prédictions"
      />
      {/* 
      <Text
        className="col-span-12 xl:col-span-4"
        title="Informations"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error expedita officia, necessitatibus asperiores sit repellat exercitationem unde eum dolores facere quod eveniet quasi, eos delectus eius corrupti excepturi illum! Facere."
      /> */}
    </div>
  );
}
