import { cn } from "@/lib/utils";

export type PropsType = {
  className?: string;
};

export function Stats({ className }: PropsType) {
  return (
    <div
      className={cn(
        "h-full w-full rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
      style={{ width: "100%", height: "100%" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Informations
        </h2>
      </div>

      <div className="place-items-left grid pb-4 pt-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis
        dignissimos quisquam ipsam? Nulla laborum corporis neque repudiandae,
        dignissimos assumenda architecto. Repellat, praesentium vero animi
        aspernatur impedit quibusdam id quaerat voluptates.
      </div>
    </div>
  );
}
