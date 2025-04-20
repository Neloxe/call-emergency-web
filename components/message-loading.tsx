import { useEffect, useState } from "react";

import { cn } from "@/utils/utils";

export type PropsType = {
  className?: string;
};

export function MessageLoading({ className }: PropsType) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "w-full rounded-[10px] bg-orange-100 px-7.5 pb-5 pt-7.5 shadow-1 dark:bg-orange-900 dark:shadow-card",
        className,
      )}
      style={{ width: "100%" }}
    >
      <div className="flex flex-wrap items-center">
        <h2 className="text-body-2xlg font-bold text-orange-700 dark:text-orange-300">
          Chargement en cours {dots}
        </h2>
      </div>

      <div className="place-items-left grid pb-4 pt-4 text-orange-600 dark:text-orange-400">
        Merci de patienter pendant le traitement des données. Cela peut prendre
        quelques instants.
      </div>
    </div>
  );
}
