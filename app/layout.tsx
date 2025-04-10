import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";

import "@/styles/satoshi.css";
import "@/styles/style.css";

import { Providers } from "@/app/provider";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "NextAdmin - Next.js Dashboard Kit",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};
export default function RootLayout({ children }: PropsWithChildren) {
  const theme =
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light";

  return (
    <html lang="en" className={theme} style={{ colorScheme: theme }}>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
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
