"use client";

import { ThemeProvider } from "next-themes";

import { SidebarProvider } from "@/context/sidebar-context";
import { ModelProvider } from "@/context/model-context";
import { PopupProvider } from "@/context/popup-context";
import { DatePickerProvider } from "@/context/date-picker-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <PopupProvider>
        <SidebarProvider>
          <DatePickerProvider>
            <ModelProvider>{children}</ModelProvider>
          </DatePickerProvider>
        </SidebarProvider>
      </PopupProvider>
    </ThemeProvider>
  );
}
