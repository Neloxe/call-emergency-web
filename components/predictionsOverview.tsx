import { cn } from "@/utils/utils";
import { PredictionsOverviewChart } from "@/components/predictionsOverviewChart";
import { DataProps } from "@/types/data";

type PropsType = {
  data: DataProps;
  className?: string;
  title?: string;
};

export function PredictionsOverview({ data, className, title }: PropsType) {
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
          {title ?? "Prédictions"}
        </h2>
      </div>
      <PredictionsOverviewChart
        predictions={predictions}
        reals={reals}
        futures={futures}
      />
      <div className="pt-4 text-center">Indice de confiance : ???</div>
    </div>
  );
}
