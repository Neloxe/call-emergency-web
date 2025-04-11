"use client";

import { usePathname } from "next/navigation";
import { useSidebarContext } from "@/components/sidebar-context";
import { ThemeToggleSwitch } from "@/components/theme-toggle";
import { SelectModel } from "./select-model";
import { MenuIcon } from "@/assets/icons";

export function Header() {
  const { toggleSidebar } = useSidebarContext();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-4 py-5 shadow-1 dark:bg-gray-dark md:px-5 2xl:px-10">
      {/* Provoque un problème avec les graphes */}
      {/* <button
        onClick={toggleSidebar}
        className="rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] mr-10"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button> */}
      <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
          Merlain 3000
        </h1>
        <p className="font-medium">
          Prédiction du nombre d'appel pour le Centre de Réception et de
          Régulation des Appels
        </p>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4 min-[375px]:gap-12">
        {pathname === "/" && <SelectModel />}
        <ThemeToggleSwitch />
      </div>
    </header>
  );
}
