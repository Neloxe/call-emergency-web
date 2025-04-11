"use client";

import { SidebarProvider } from "@/components/sidebar-context";
import { ModelProvider } from "@/components/model-context";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <SidebarProvider>
        <ModelProvider>{children}</ModelProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
