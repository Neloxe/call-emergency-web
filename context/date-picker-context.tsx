import { createContext, useContext, useState, ReactNode } from "react";

const DatePickerContext = createContext<{
  isDatePickerOpen: boolean;
  setDatePickerOpen: (isOpen: boolean) => void;
} | null>(null);

export function DatePickerProvider({ children }: { children: ReactNode }) {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <DatePickerContext.Provider value={{ isDatePickerOpen, setDatePickerOpen }}>
      {children}
    </DatePickerContext.Provider>
  );
}

export function useDatePickerContext() {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error(
      "useDatePickerContext must be used within a DatePickerProvider",
    );
  }
  return context;
}
