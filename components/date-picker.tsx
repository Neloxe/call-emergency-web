import { useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { French } from "flatpickr/dist/l10n/fr.js";

import { Calendar } from "@/assets/icons";

import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  value?: string | null;
  label?: string;
  placeholder?: string;
  minDate?: DateOption;
  maxDate?: DateOption;
};

export default function DatePicker({
  id,
  mode,
  onChange,
  defaultDate,
  value,
  placeholder,
  minDate,
  maxDate,
}: PropsType) {
  useEffect(() => {
    const flatPickr = flatpickr(`#${id}`, {
      mode: mode || "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d H:i",
      enableTime: true,
      time_24hr: true,
      defaultDate: value || defaultDate,
      onChange,
      locale: French,
      minDate,
      maxDate,
    });

    return () => {
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [mode, onChange, id, value, defaultDate, minDate, maxDate]);

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          placeholder={placeholder}
          value={value || ""}
          readOnly
          className="shadow-theme-xs focus:outline-hidden focus:ring-3 focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <Calendar className="size-6" />
        </span>
      </div>
    </div>
  );
}
