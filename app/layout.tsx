import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";

import "@/styles/satoshi.css";
import "@/styles/style.css";

import { Providers } from "@/app/provider";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { COLORS } from "@/utils/color";

export const metadata: Metadata = {
  title: {
    template: "Merlain - %s",
    default: "Merlain",
  },
  description:
    "Prédiction du nombre d'appel pour le Centre de Réception et de Régulation des Appels.",
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
          <NextTopLoader color={COLORS.BLUE} showSpinner={false} />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <Header />

              <main className="max-w-screen-l isolate mx-auto w-full overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
