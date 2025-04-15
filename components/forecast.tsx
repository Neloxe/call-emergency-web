import { cn } from "@/utils/utils";

export type PropsType = {
  className?: string;
  data: {
    date: string;
    value: number;
  }[];
};

export function Forecast({ className, data }: PropsType) {
  return (
    <div
      className={cn(
        "h-full w-full rounded-[10px] bg-white px-7.5 pb-5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
      style={{ width: "100%", height: "100%" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Futures Prédictions
        </h2>
        <div className="w-full"></div>
        <div className="flex flex-col gap-2">
          {data.slice(0, 7).map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="ml-6 pb-2 text-base text-gray-600 dark:text-gray-300">
                {new Date(item.date)
                  .toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: undefined,
                  })
                  .replace(":00", "h")}{" "}
                :
              </span>
              <span className="ml-8 pb-2 text-base font-medium text-dark dark:text-white">
                {Math.ceil(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
