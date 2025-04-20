import React from "react";
import { cn } from "@/utils/utils";

type ForecastValuesProps = {
  data: { date: string; value: number }[][];
};

export function ForecastValues({ data }: ForecastValuesProps) {
  if (data.length === 0) {
    return (
      <div className="mx-auto flex h-[250px] w-full items-center justify-center pt-10 text-gray-600 dark:text-gray-300">
        Aucun résultat disponible pour la plage de dates sélectionnée.
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      {data.map((col, colIdx) => (
        <div
          key={colIdx}
          className={cn(
            "flex flex-1 flex-col",
            colIdx !== 0 && "border-l border-black dark:border-white",
          )}
          style={{ minWidth: 160 }}
        >
          {col.map((group, rowIdx) => (
            <div
              key={rowIdx}
              className="px-2 py-3"
              style={{ minHeight: "50px" }}
            >
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {new Date(group.date).toLocaleDateString("fr-FR", {
                  year: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                })}{" "}
                :
              </span>
              <span className="ml-4 font-medium text-dark dark:text-white">
                {Math.ceil(group.value)}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
