import { cn } from "@/utils/utils";
import { PredictionsOverviewChart } from "@/components/predictionsOverviewChart";
import { DataProps } from "@/types/data";
import DatePicker from "./datePicker";

type PropsType = {
  data: DataProps;
  title?: string;
  className?: string;
  addDateRange?: boolean;
  dateRange?: [string | null, string | null];
  setDateRange?: (range: [string | null, string | null]) => void;
};

export function PredictionsOverview({
  data,
  className,
  title = "Prédictions",
  addDateRange = false,
  dateRange = [null, null],
  setDateRange,
}: PropsType) {
  const { predictions, reals, futures } = data;

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
        {addDateRange && setDateRange && (
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
                    alert(
                      "La date de début ne peut pas être supérieure à la date de fin.",
                    );
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
                    alert(
                      "La date de fin ne peut pas être inférieure à la date de début.",
                    );
                  } else {
                    setDateRange([dateRange[0], currentDateString]);
                  }
                }
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
    </div>
  );
}
