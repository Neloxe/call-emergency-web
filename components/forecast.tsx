import { useState } from "react";

import { ChevronUpIcon } from "@/assets/icons";

import { cn } from "@/utils/utils";

import { useFakeDate } from "@/hooks/use-fake-date";

import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/dropdown";
import MessageToast from "@/components/message-toast";
import { DateRangePicker } from "@/components/date-range-picker";
import { ForecastValues } from "./forecast-values";
import { filterDataByDateRange } from "@/utils/filter-data";

type Props = {
  data: {
    date: string;
    value: number;
  }[];
  className?: string;
};

export function Forecast({ data, className }: Props) {
  const currentDate = useFakeDate();

  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const handleDateRangeChange = (range: [string | null, string | null]) => {
    setDateRange(range);
  };

  const [isOpen, setIsOpen] = useState(false);

  const [groupTime, setGroupTime] = useState("1h");
  const items = ["1h", "2h", "4h", "6h", "8h", "12h", "24h"];

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const filteredData = filterDataByDateRange(
    { predictions: data, reals: [], futures: [] },
    dateRange[0],
    dateRange[1],
  ).predictions;

  const groupedData = filteredData.reduce(
    (acc, curr) => {
      const groupInterval = parseInt(groupTime) * 60 * 60 * 1000;

      const baseDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getHours(),
        0,
        0,
        0,
      );

      const date = new Date(curr.date);
      const timeDiff = date.getTime() - baseDate.getTime();
      const timeGroup = Math.floor(timeDiff / groupInterval);

      if (timeGroup >= 0) {
        if (!acc[timeGroup]) {
          const groupStartDate = new Date(
            baseDate.getTime() + timeGroup * groupInterval,
          );
          acc[timeGroup] = {
            date: groupStartDate.toISOString(),
            value: 0,
            count: 0,
          };
        }
        acc[timeGroup].value += curr.value;
        acc[timeGroup].count += 1;
      }

      return acc;
    },
    {} as Record<number, { date: string; value: number; count: number }>,
  );

  const groupedDataArray = Object.values(groupedData).filter(
    (group) => group.count >= parseInt(groupTime),
  );

  const columns = groupedDataArray.reduce(
    (acc, group, index) => {
      const colIndex = Math.floor(index / 6);
      if (!acc[colIndex]) {
        acc[colIndex] = [];
      }
      acc[colIndex].push(group);
      return acc;
    },
    [] as { date: string; value: number }[][],
  );

  const minDate = new Date(data[0].date);
  const maxDate = new Date(data[data.length - 1].date);

  return (
    <>
      {toastMessage && (
        <MessageToast
          message={toastMessage}
          type={toastType}
          onClose={() => {
            setToastMessage(null);
            setToastType("info");
          }}
        />
      )}
      <div
        className={cn(
          "h-full w-full rounded-[10px] bg-white px-7.5 pb-5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
          className,
        )}
        style={{ width: "100%", height: 410 }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
            Prédictions
          </h2>
          <div className="ml-auto flex items-center">
            <DateRangePicker
              startId="date-picker-start-forecast"
              endId="date-picker-end-forecast"
              onDateRangeChange={handleDateRangeChange}
              className="ml-auto"
              minDate={minDate}
              maxDate={maxDate}
            />
            <div className="flex items-center pl-10">
              <div className="pr-3">Grouper par :</div>
              <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
                <DropdownTrigger
                  className={cn(
                    "flex h-11 w-full items-center justify-between gap-x-1 rounded-md border border-[#E8E8E8] bg-white px-3 py-2 text-sm font-medium text-dark-5 outline-none ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-neutral-500 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[placeholder]:text-neutral-400 [&>span]:line-clamp-1 [&[data-state='open']>svg]:rotate-0",
                  )}
                >
                  <span
                    className="capitalize"
                    style={{ minWidth: "2.5rem", textAlign: "center" }}
                  >
                    {groupTime}
                  </span>
                  <ChevronUpIcon className="size-4 rotate-180 transition-transform" />
                </DropdownTrigger>

                <DropdownContent
                  align="end"
                  className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 min-w-[7rem] overflow-hidden rounded-lg border border-[#E8E8E8] bg-white p-1 font-medium text-dark-5 shadow-md dark:border-dark-3 dark:bg-dark-2 dark:text-current"
                >
                  <ul>
                    {items.map((item) => (
                      <li key={item}>
                        <button
                          className="flex w-full select-none items-center truncate rounded-md px-3 py-2 text-sm capitalize outline-none hover:bg-[#F9FAFB] hover:text-dark-3 dark:hover:bg-[#FFFFFF1A] dark:hover:text-white"
                          onClick={() => {
                            setGroupTime(item);
                            setIsOpen(false);
                          }}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </DropdownContent>
              </Dropdown>
            </div>
          </div>
          <div
            style={{ height: 300 }}
            className="w-full overflow-x-auto overflow-y-auto"
          >
            <ForecastValues data={columns} />
          </div>
        </div>
      </div>
    </>
  );
}
