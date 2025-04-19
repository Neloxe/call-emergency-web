import React, { useState } from "react";

import DatePicker from "@/components/date-picker";
import MessageToast from "@/components/message-toast";

type DateRangePickerProps = {
  startId: string;
  endId: string;
  onDateRangeChange: (range: [string | null, string | null]) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
};

export function DateRangePicker({
  startId,
  endId,
  onDateRangeChange,
  className,
  minDate,
  maxDate,
}: DateRangePickerProps) {
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const handleStartDateChange = (_: any, currentDateString: string | null) => {
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
        const newRange: [string | null, string | null] = [
          currentDateString,
          dateRange[1],
        ];
        setDateRange(newRange);
        onDateRangeChange(newRange);
      }
    }
  };

  const handleEndDateChange = (_: any, currentDateString: string | null) => {
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
        const newRange: [string | null, string | null] = [
          dateRange[0],
          currentDateString,
        ];
        setDateRange(newRange);
        onDateRangeChange(newRange);
      }
    }
  };

  return (
    <div className={`flex gap-4 ${className}`}>
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
      <DatePicker
        id={startId}
        placeholder="Date de début"
        minDate={minDate}
        maxDate={dateRange[1] || maxDate}
        onChange={handleStartDateChange}
      />
      <DatePicker
        id={endId}
        placeholder="Date de fin"
        minDate={dateRange[0] || minDate}
        maxDate={maxDate}
        onChange={handleEndDateChange}
      />
    </div>
  );
}
