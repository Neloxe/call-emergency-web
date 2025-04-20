import { cn } from "@/utils/utils";

export type PropsType = {
  className?: string;
  message: string;
};

export function MessageError({ className, message }: PropsType) {
  return (
    <div
      className={cn(
        "w-full rounded-[10px] bg-red-100 px-7.5 pb-5 pt-7.5 shadow-1 dark:bg-red-900 dark:shadow-card",
        className,
      )}
      style={{ width: "100%" }}
    >
      <div className="flex flex-wrap items-center">
        <h2 className="text-body-2xlg font-bold text-red-700 dark:text-red-300">
          Une erreur est survenue
        </h2>
      </div>

      <div className="place-items-left grid pb-4 pt-4 text-red-600 dark:text-red-400">
        {message}
      </div>
    </div>
  );
}
