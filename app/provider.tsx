"use client";

import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/context/sidebar-context";
import { ModelProvider } from "@/context/model-context";
import { PopupProvider } from "@/context/popupContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <PopupProvider>
        <SidebarProvider>
          <ModelProvider>{children}</ModelProvider>
        </SidebarProvider>
      </PopupProvider>
    </ThemeProvider>
  );
}
