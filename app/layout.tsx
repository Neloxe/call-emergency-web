"use client";

import { useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";

import "@/styles/satoshi.css";
import "@/styles/style.css";

import { Providers } from "@/app/provider";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { COLORS } from "@/utils/color";

import { themeType } from "@/types/types";

export default function RootLayout({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<themeType>("light");

  useEffect(() => {
    const storedTheme = (localStorage.getItem("theme") as themeType) || "light";
    setTheme(storedTheme);
  }, []);

  if (theme === null) {
    <div className="flex min-h-screen items-center justify-center bg-gray-2 text-gray-800 dark:bg-[#020d1a] dark:text-gray-200">
      Chargement...
    </div>;
  }

  return (
    <html lang="en" className={theme} style={{ colorScheme: theme }}>
      <body>
        <Providers>
          <NextTopLoader color={COLORS.BLUE} showSpinner={false} />
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="min-h-screen w-full bg-gray-2 dark:bg-[#020d1a]">
              <Header />
              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
