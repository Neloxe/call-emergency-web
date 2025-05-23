import { cn } from "@/utils/utils";

export type PropsType = {
  className?: string;
  title: string;
  body: React.ReactNode;
};

export function Text({ className, title, body }: PropsType) {
  return (
    <div
      className={cn(
        "w-full rounded-[10px] bg-white px-7.5 pb-5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
      style={{ width: "100%" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          {title}
        </h2>
      </div>

      <div className="place-items-left grid pb-4 pt-4">{body}</div>
    </div>
  );
}
