"use client";

import { ChevronUpIcon } from "@/assets/icons";
import { cn } from "@/utils/utils";
import { useState } from "react";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/dropdown";
import { useModel } from "./model-context";

type SelectModelProps = {
  items?: string[];
  minimal?: boolean;
};

export const SelectModel = ({
  items = ["Merlain-week", "Merlain-2-weeks", "Merlain-month"],
  minimal,
}: SelectModelProps) => {
  const { selectedModel, setSelectedModel } = useModel();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger
        className={cn(
          "flex h-8 w-full items-center justify-between gap-x-1 rounded-md border border-[#E8E8E8] bg-white px-3 py-2 text-sm font-medium text-dark-5 outline-none ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-neutral-500 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:ring-offset-neutral-950 dark:focus:ring-neutral-300 dark:data-[placeholder]:text-neutral-400 [&>span]:line-clamp-1 [&[data-state='open']>svg]:rotate-0",
          minimal &&
            "border-none bg-transparent p-0 text-dark dark:bg-transparent dark:text-white"
        )}
      >
        <span className="capitalize">{selectedModel || "Select Model"}</span>
        <ChevronUpIcon className="size-4 rotate-180 transition-transform" />
      </DropdownTrigger>

      <DropdownContent
        align="end"
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 min-w-[7rem] overflow-hidden rounded-lg border border-[#E8E8E8] bg-white p-1 font-medium text-dark-5 shadow-md dark:border-dark-3 dark:bg-dark-2 dark:text-current"
      >
        <ul>
          {items.map((item) => (
            <li key={item}>
              <button
                className="flex w-full select-none items-center truncate rounded-md px-3 py-2 text-sm capitalize outline-none hover:bg-[#F9FAFB] hover:text-dark-3 dark:hover:bg-[#FFFFFF1A] dark:hover:text-white"
                onClick={() => {
                  setSelectedModel(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </DropdownContent>
    </Dropdown>
  );
};
