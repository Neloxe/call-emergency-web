import { cn } from "@/utils/utils";
import { PredictionsOverviewChart } from "@/components/predictionsOverviewChart";
import { DataProps } from "@/types/types";
import DatePicker from "./datePicker";
import React, { useState } from "react";
import MessageToast from "@/components/messageToast";

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

  const filterDataByDateRange = (
    data: DataProps,
    startDate: string | null,
    endDate: string | null,
  ): DataProps => {
    const isWithinRange = (date: string) => {
      const dateObj = new Date(date);
      const isAfterStartDate = startDate
        ? dateObj >= new Date(startDate)
        : true;
      const isBeforeEndDate = endDate ? dateObj <= new Date(endDate) : true;
      return isAfterStartDate && isBeforeEndDate;
    };

    return {
      predictions: data.predictions.filter((item) => isWithinRange(item.date)),
      reals: data.reals.filter((item) => isWithinRange(item.date)),
      futures: data.futures.filter((item) => isWithinRange(item.date)),
    };
  };

  const filteredData = filterDataByDateRange(data, dateRange[0], dateRange[1]);

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
            <div className="mr-10 flex gap-4">
              <DatePicker
                id="date-picker-start"
                placeholder="Date de début"
                onChange={(_, currentDateString) => {
                  if (currentDateString) {
                    if (
                      dateRange[1] &&
                      new Date(currentDateString) > new Date(dateRange[1])
                    ) {
                      setToastMessage(
                        "La date de début ne peut pas être supérieure à la date de fin.",
                      );
                      setToastType("error");
                    } else {
                      setDateRange([currentDateString, dateRange[1]]);
                    }
                  }
                }}
              />
              <DatePicker
                id="date-picker-end"
                placeholder="Date de fin"
                onChange={(_, currentDateString) => {
                  if (currentDateString) {
                    if (
                      dateRange[0] &&
                      new Date(currentDateString) < new Date(dateRange[0])
                    ) {
                      setToastMessage(
                        "La date de fin ne peut pas être inférieure à la date de début.",
                      );
                      setToastType("error");
                    } else {
                      setDateRange([dateRange[0], currentDateString]);
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
        {!filteredData ||
        !filteredData.predictions ||
        filteredData.predictions.length === 0 ? (
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
