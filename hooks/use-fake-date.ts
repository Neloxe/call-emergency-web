import { useEffect, useState } from "react";
import { useDatePickerContext } from "@/context/date-picker-context";

export function useFakeDate(): Date {
  const now = new Date();
  const initialFakeDate = new Date(`2024-11-01T${now.toTimeString().split(" ")[0]}`);
  const [fakeDate, setFakeDate] = useState<Date>(initialFakeDate);
  const { isDatePickerOpen } = useDatePickerContext();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDatePickerOpen) {
        const now = new Date();
        const newFakeDate = new Date(`2024-11-01T${now.toTimeString().split(" ")[0]}`);
        setFakeDate(newFakeDate);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isDatePickerOpen]);

  return fakeDate;
}