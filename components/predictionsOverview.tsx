import { cn } from "@/utils/utils";
import { PredictionsOverviewChart } from "@/components/predictionsOverviewChart";
import { DataProps } from "@/types/data";
import DatePicker from "./datePicker";
import { useEffect, useState } from "react";

type PropsType = {
  data: DataProps;
  className?: string;
  title: string;
  isAllData: boolean;
};

export function PredictionsOverview({
  data,
  className,
  title,
  isAllData,
}: PropsType) {
  const { predictions, reals, futures } = data;

  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    console.log("Date range changed:", dateRange);
  }, [dateRange]);

  return (
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
        {isAllData && (
          <div className="mr-10 flex gap-4">
            <DatePicker
              id="date-picker-start"
              placeholder="Date de début"
              onChange={(_, currentDateString) => {
                setDateRange([currentDateString, dateRange[1]]);
              }}
            />
            <DatePicker
              id="date-picker-end"
              placeholder="Date de fin"
              onChange={(_, currentDateString) => {
                setDateRange([dateRange[0], currentDateString]);
              }}
            />
          </div>
        )}
      </div>
      <div className="flex gap-4"></div>
      <PredictionsOverviewChart
        predictions={predictions}
        reals={reals}
        futures={futures}
        dateRange={dateRange}
      />
      <div className="pt-4 text-center">Indice de confiance : ???</div>
    </div>
  );
}
