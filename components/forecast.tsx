import { useState } from "react";
import MessageToast from "@/components/messageToast";
import DatePicker from "@/components/datePicker";
import { ChevronUpIcon } from "@/assets/icons";
import { cn } from "@/utils/utils";
import { fakeDate } from "@/utils/const";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/dropdown";

type Props = {
  data: {
    date: string;
    value: number;
  }[];
  className?: string;
};

export function Forecast({ data, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [groupTime, setGroupTime] = useState("1h");
  const items = ["1h", "2h", "4h", "6h", "8h", "12h", "24h"];
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);

    if (dateRange[0] && dateRange[1]) {
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);
      return itemDate >= startDate && itemDate <= endDate;
    }

    if (dateRange[0]) {
      const startDate = new Date(dateRange[0]);
      return itemDate >= startDate;
    }

    if (dateRange[1]) {
      const endDate = new Date(dateRange[1]);
      return itemDate <= endDate;
    }

    return true;
  });

  const currentDate = fakeDate;

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
            <div className="flex items-center gap-4">
              <DatePicker
                id="date-picker-start-forecast"
                placeholder="Date de début"
                onChange={(_, currentDateString) => {
                  if (currentDateString) {
                    if (
                      dateRange[1] &&
                      new Date(currentDateString) > new Date(dateRange[1])
                    ) {
                      setToastMessage(
                        "La date de début ne peut pas être supérieure à la date de fin.",
                      );
                      setToastType("error");
                    } else {
                      setDateRange([currentDateString, dateRange[1]]);
                    }
                  }
                }}
              />
              <DatePicker
                id="date-picker-end-forecast"
                placeholder="Date de fin"
                onChange={(_, currentDateString) => {
                  if (currentDateString) {
                    if (
                      dateRange[0] &&
                      new Date(currentDateString) < new Date(dateRange[0])
                    ) {
                      setToastMessage(
                        "La date de fin ne peut pas être inférieure à la date de début.",
                      );
                      setToastType("error");
                    } else {
                      setDateRange([dateRange[0], currentDateString]);
                    }
                  }
                }}
              />
            </div>
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
            {groupedDataArray.length === 0 ? (
              <div className="mx-auto flex h-[250px] w-full items-center justify-center pt-10 text-gray-600 dark:text-gray-300">
                Aucun résultat disponible pour la plage de dates sélectionnée.
              </div>
            ) : (
              <div className="flex h-full w-full">
                {columns.map((col, colIdx) => (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
