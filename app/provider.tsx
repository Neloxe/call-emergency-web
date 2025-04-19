"use client";

import { SidebarProvider } from "@/components/sidebar-context";
import { ModelProvider } from "@/components/model-context";
import { ThemeProvider } from "next-themes";
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
