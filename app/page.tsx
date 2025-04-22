"use client";

import { useEffect, useState } from "react";

import { getData } from "@/utils/get-data";

import { DataProps } from "@/types/types";
import { useModel } from "@/context/model-context";

import { Clock } from "@/components/clock";
import { PredictionsOverview } from "@/components/predictions-overview";
import { Statistics } from "@/components/statistic";
import { Forecast } from "@/components/forecast";
import { MessageError } from "@/components/message-error";
import { MessageLoading } from "@/components/message-loading";

export default function Home() {
  useEffect(() => {
    document.title = "Merlain - Prédictions";
  }, []);

  const { selectedModel } = useModel();

  const [data_month, setdata_month] = useState<DataProps | null>(null);
  const [data_day, setData_day] = useState<DataProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedModel) {
        setError(null);
        setdata_month(null);
        setData_day(null);
        setLoading(true);

        try {
          const [data_month_response, data_day_response] = await Promise.all([
            getData(30, selectedModel),
            getData(1, selectedModel),
          ]);

          setdata_month(data_month_response);
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

  return (
    <div className="z-0 mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-0 2xl:gap-7.5">
      <Clock className="xl:col-span- col-span-12" />
      {data_month && (
        <>
          <Statistics data={data_month} className="xl:col-span- col-span-12" />
          <Forecast
            data={data_month.futures}
            className="xl:col-span- col-span-12"
          />
        </>
      )}
      {data_day && (
        <PredictionsOverview
          data={data_day}
          className="col-span-12 xl:col-span-12"
          title="Prédictions sur la journée"
        />
      )}
      {data_month && (
        <PredictionsOverview
          data={data_month}
          className="col-span-12 xl:col-span-12"
          title="Prédictions sur le mois"
          addDateRange={true}
        />
      )}
    </div>
  );
}
