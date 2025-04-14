"use client";

import { MessageError } from "@/components/messageError";
import { MessageLoading } from "@/components/messageLoading";
import { useModel } from "@/components/model-context";
import { PredictionsOverview } from "@/components/predictionsOverview";
import { DataProps } from "@/types/data";
import { getData } from "@/utils/get-data";
import { useEffect, useState } from "react";

export default function Home() {
  const { selectedModel } = useModel();

  const [data_month, setdata_month] = useState<DataProps | null>(null);
  const [data_week, setdata_week] = useState<DataProps | null>(null);
  const [data_day, setData_day] = useState<DataProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedModel) {
        setError(null);
        setdata_month(null);
        setdata_week(null);
        setData_day(null);
        setLoading(true);

        try {
          const [data_month_response, data_week_response, data_day_response] =
            await Promise.all([
              getData(30, selectedModel),
              getData(7, selectedModel),
              getData(1, selectedModel),
            ]);

          setdata_month(data_month_response);
          setdata_week(data_week_response);
          setData_day(data_day_response);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Impossible de récupérer les données.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedModel]);

  if (error) {
    return <MessageError message={error} />;
  }

  if (loading) {
    return <MessageLoading />;
  }

  console.log("data_month", data_month);
  console.log("data_week", data_week);
  console.log("data_day", data_day);

  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      {data_month && (
        <PredictionsOverview
          data={data_month}
          className="col-span-12 xl:col-span-12"
          title="Prédictions sur le mois"
        />
      )}
      {data_week && (
        <PredictionsOverview
          data={data_week}
          className="col-span-12 xl:col-span-12"
          title="Prédictions sur la semaine"
        />
      )}
      {data_day && (
        <PredictionsOverview
          data={data_day}
          className="col-span-12 xl:col-span-12"
          title="Prédictions pour les prochaines heures"
        />
      )}
    </div>
  );
}
