import { useEffect, useState } from "react";

export function useFakeDate(): Date {
  const now = new Date();
  const initialFakeDate = new Date(`2024-11-01T${now.toTimeString().split(" ")[0]}`);
  const [fakeDate, setFakeDate] = useState<Date>(initialFakeDate);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newFakeDate = new Date(`2024-11-01T${now.toTimeString().split(" ")[0]}`);
      setFakeDate(newFakeDate);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return fakeDate;
}