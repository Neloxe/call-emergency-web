import { PeriodPicker } from "@/components/period-picker";
import { standardFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import { getPaymentsOverviewData } from "@/services/charts.services";
import { PaymentsOverviewChart } from "./Charts/payments-overview/chart";
import { PredictionsOverviewChart } from "@/components/PredictionsOverviewChart";

type PropsType = {
  // predictions: number[];
  // reals: number[];
  data: Promise<{
    predictions: number[];
    reals: number[];
  }>;
  className?: string;
  title?: string;
};

export async function PredictionsOverview({
  data,
  className,
  title,
}: PropsType) {
  const { predictions, reals } = await data;
  return (
    <div
      className={cn(
        "grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          {title ?? "Prédictions"}
        </h2>

        {/* <PeriodPicker defaultValue={timeFrame} sectionKey="payments_overview" /> */}
      </div>
      <PredictionsOverviewChart predictions={predictions} reals={reals} />
      <div className="pt-4 text-center">Indice de confiance : ???</div>
    </div>
  );
}
