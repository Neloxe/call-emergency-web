import { cn } from "@/utils/utils";
import { filterDataByDateRange } from "@/utils/filter-data";

import React, { useState } from "react";

import { DataProps } from "@/types/types";

import MessageToast from "@/components/message-toast";
import { PredictionsOverviewChart } from "@/components/predictions-overview-chart";
import { DateRangePicker } from "@/components/date-range-picker";

type PropsType = {
  data: DataProps;
  title?: string;
  className?: string;
  addDateRange?: boolean;
};

export function PredictionsOverview({
  data,
  className,
  title = "Prédictions",
  addDateRange = false,
}: PropsType) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const filteredData = filterDataByDateRange(data, dateRange[0], dateRange[1]);

  const handleDateRangeChange = (range: [string | null, string | null]) => {
    setDateRange(range);
  };

  const minDate = new Date(data.predictions[0].date);
  const maxDate = new Date(data.futures[data.futures.length - 1].date);

  return (
    <>
      {toastMessage && (
        <MessageToast
          message={toastMessage}
          type={toastType}
          onClose={() => {
            setToastMessage(null);
            setToastType("info");
          }}
        />
      )}
      <div
        className={cn(
          "grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
          className,
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
            {title}
          </h2>
          {addDateRange && (
            <DateRangePicker
              startId="date-picker-start-overview"
              endId="date-picker-end-overview"
              onDateRangeChange={handleDateRangeChange}
              className="mr-10"
              minDate={minDate}
              maxDate={maxDate}
            />
          )}
        </div>
        {filteredData.predictions.length === 0 &&
        filteredData.futures.length === 0 ? (
          <div className="mx-auto flex h-[250px] w-full items-center justify-center pt-10 text-gray-600 dark:text-gray-300">
            Aucun résultat disponible pour la plage de dates sélectionnée.
          </div>
        ) : (
          <PredictionsOverviewChart data={filteredData} dateRange={dateRange} />
        )}
      </div>
    </>
  );
}
