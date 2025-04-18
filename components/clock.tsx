import { useEffect, useState } from "react";
import { cn } from "@/utils/utils";

export type PropsType = {
  className?: string;
};

export function Clock({ className }: PropsType) {
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const now = new Date();
    return new Date(`2024-11-01T${now.toTimeString().split(" ")[0]}`);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(
        new Date(`2024-11-01T${now.toTimeString().split(" ")[0]}`),
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={cn(
        "h-full w-full rounded-[10px] bg-white px-7.5 pb-5 pt-5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
      style={{ width: "100%", height: "100%" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-body-2xlg font-bold text-dark dark:text-white">
          {currentDate.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          -{" "}
          {currentDate.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h1>
      </div>
    </div>
  );
}
