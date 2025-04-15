"use client";

import { Forecast } from "@/components/forecast";
import { MessageError } from "@/components/messageError";
import { MessageLoading } from "@/components/messageLoading";
import { useModel } from "@/components/model-context";
import { PredictionsOverview } from "@/components/predictionsOverview";
import { Statistics } from "@/components/statistic";
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

  const [dateRangeMonth, setDateRangeMonth] = useState<
    [string | null, string | null]
  >([null, null]);
  const [dateRangeWeek, setDateRangeWeek] = useState<
    [string | null, string | null]
  >([null, null]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedModel) {
        setError(null);
        setdata_month(null);
        setdata_week(null);
        setData_day(null);
        setLoading(true);

        try {
          const [
            allDataResponse,
            data_month_response,
            data_week_response,
            data_day_response,
          ] = await Promise.all([
            getData(30, selectedModel),
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
  {
    data_month && (
      <PredictionsOverview
        data={data_month}
        className="col-span-12 xl:col-span-12"
        title="Prédictions sur le mois"
        addDateRange={true}
        dateRange={dateRangeMonth}
        setDateRange={setDateRangeMonth}
      />
    );
  }

  if (loading) {
    return <MessageLoading />;
  }

  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      <Statistics />
      {data_day && (
        <>
          <PredictionsOverview
            data={data_day}
            className="col-span-12 xl:col-span-10"
            title="Prédictions sur la journée"
          />
          <Forecast
            className="col-span-12 xl:col-span-2"
            data={data_day.futures}
          />
        </>
      )}
      {data_month && (
        <PredictionsOverview
          data={data_month}
          className="col-span-12 xl:col-span-12"
          title="Prédictions sur le mois"
          addDateRange={true}
          dateRange={dateRangeMonth}
          setDateRange={setDateRangeMonth}
        />
      )}
      {/* {data_week && (
        <PredictionsOverview
          data={data_week}
          className="col-span-12 xl:col-span-12"
          title="Prédictions sur la semaine"
          addDateRange={true}
          dateRange={dateRangeWeek}
          setDateRange={setDateRangeWeek}
        />
      )} */}
    </div>
  );
}
