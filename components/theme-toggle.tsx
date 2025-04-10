import { cn } from "@/utils/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { SVGProps } from "react";

function Sun(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path d="M10 1.042c.345 0 .625.28.625.625V2.5a.625.625 0 11-1.25 0v-.833c0-.346.28-.625.625-.625zM3.666 3.665a.625.625 0 01.883 0l.328.328a.625.625 0 01-.884.884l-.327-.328a.625.625 0 010-.884zm12.668 0a.625.625 0 010 .884l-.327.328a.625.625 0 01-.884-.884l.327-.327a.625.625 0 01.884 0zM10 5.626a4.375 4.375 0 100 8.75 4.375 4.375 0 000-8.75zM4.375 10a5.625 5.625 0 1111.25 0 5.625 5.625 0 01-11.25 0zm-3.333 0c0-.345.28-.625.625-.625H2.5a.625.625 0 110 1.25h-.833A.625.625 0 011.042 10zm15.833 0c0-.345.28-.625.625-.625h.833a.625.625 0 010 1.25H17.5a.625.625 0 01-.625-.625zm-1.752 5.123a.625.625 0 01.884 0l.327.327a.625.625 0 11-.884.884l-.327-.327a.625.625 0 010-.884zm-10.246 0a.625.625 0 010 .884l-.328.327a.625.625 0 11-.883-.884l.327-.327a.625.625 0 01.884 0zM10 16.875c.345 0 .625.28.625.625v.833a.625.625 0 01-1.25 0V17.5c0-.345.28-.625.625-.625z" />
    </svg>
  );
}

function Moon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.18 2.334a7.71 7.71 0 108.485 8.485A6.042 6.042 0 119.18 2.335zM1.042 10a8.958 8.958 0 018.958-8.958c.598 0 .896.476.948.855.049.364-.086.828-.505 1.082a4.792 4.792 0 106.579 6.579c.253-.42.717-.555 1.081-.506.38.052.856.35.856.948A8.958 8.958 0 011.04 10z"
      />
    </svg>
  );
}

const THEMES = [
  {
    name: "light",
    Icon: Sun,
  },
  {
    name: "dark",
    Icon: Moon,
  },
];

export function ThemeToggleSwitch() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="group rounded-full bg-gray-3 p-[5px] text-[#111928] outline-1 outline-primary focus-visible:outline dark:bg-[#020D1A] dark:text-current"
    >
      <span className="sr-only">
        Switch to {theme === "light" ? "dark" : "light"} mode
      </span>

      <span aria-hidden className="relative flex gap-2.5">
        {/* Indicator */}
        <span className="absolute size-[38px] rounded-full border border-gray-200 bg-white transition-all dark:translate-x-[48px] dark:border-none dark:bg-dark-2 dark:group-hover:bg-dark-3" />

        {THEMES.map(({ name, Icon }) => (
          <span
            key={name}
            className={cn(
              "relative grid size-[38px] place-items-center rounded-full",
              name === "dark" && "dark:text-white"
            )}
          >
            <Icon />
          </span>
        ))}
      </span>
    </button>
  );
}
