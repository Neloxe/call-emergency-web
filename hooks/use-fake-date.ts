import { useEffect, useState } from "react";

export function useFakeDate(): Date {
  const now = new Date();
  const initialFakeDate = new Date(`2024-11-01T${now.getHours().toString().padStart(2, "0")}:00:00`);
  const [fakeDate, setFakeDate] = useState<Date>(initialFakeDate);

  useEffect(() => {
    const updateFakeDate = () => {
      const now = new Date();
      const newFakeDate = new Date(`2024-11-01T${now.getHours().toString().padStart(2, "0")}:00:00`);
      setFakeDate(newFakeDate);
    };

    updateFakeDate();

    const interval = setInterval(() => {
      updateFakeDate();
    }, 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return fakeDate;
}