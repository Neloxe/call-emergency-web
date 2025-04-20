"use client";

import React from "react";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  TrendingUpIcon,
  CheckIcon,
  XIcon,
} from "@/assets/icons";

import { cn } from "@/utils/utils";

import { DataProps } from "@/types/types";

import { useFakeDate } from "@/hooks/use-fake-date";

import Badge from "@/components/badge";

type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface MetricCardProps {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  value: string;
  badgeValue?: string;
  badgeText?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  badgeValue,
  badgeText,
}) => {
  let computedBadgeColor = "primary" as BadgeColor;
  let computedBadgeIcon = null;

  if (badgeValue) {
    const isBadgeNegative = badgeValue.startsWith("-");
    const isBadgeNeutral = badgeValue == "0.00%";

    computedBadgeColor = isBadgeNegative
      ? "error"
      : isBadgeNeutral
        ? "primary"
        : "success";
    computedBadgeIcon = isBadgeNegative ? (
      <ArrowDownIcon className="text-error" />
    ) : isBadgeNeutral ? null : (
      <ArrowUpIcon className="text-success" />
    );
  }

  return (
    <div className="grid gap-4 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center space-x-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
          {React.cloneElement(icon, {
            className: "text-gray-800 dark:text-white/90",
          })}
        </div>
        <div className="flex flex-col">
          <span className="ml-4 font-medium text-dark dark:text-white">
            {title}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-title-md ml-2 mt-2 font-bold text-gray-800 dark:text-white/90">
          {value}
        </div>
        {badgeValue && (
          <div className="ml-auto mt-2 flex items-center justify-center space-x-2 self-end">
            <Badge color={computedBadgeColor}>
              {computedBadgeIcon}
              {badgeValue}
            </Badge>
            {badgeText && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {badgeText}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

type Props = {
  data: DataProps;
  className?: string;
};

export const Statistics = ({ data, className }: Props) => {
  const currentDate = useFakeDate();

  const sumDailyCalls = Math.ceil(
    data.futures.reduce((acc, curr) => {
      const formattedDate = new Date(currentDate).toISOString().split("T")[0];
      const formattedCurrDate = curr.date.split(" ")[0];
      if (formattedCurrDate === formattedDate) {
        return acc + curr.value;
      }
      return acc;
    }, 0),
  );

  const sumPreviousDailyCalls = Math.ceil(
    data.reals.reduce((acc, curr) => {
      const yesterday = new Date(currentDate);
      yesterday.setDate(yesterday.getDate() - 1);
      const formattedYesterday = yesterday.toISOString().split("T")[0];
      const formattedCurrDate = curr.date.split(" ")[0];
      if (formattedCurrDate === formattedYesterday) {
        return acc + curr.value;
      }
      return acc;
    }, 0),
  );

  const percentageChange = (
    ((sumDailyCalls - sumPreviousDailyCalls) / sumPreviousDailyCalls) *
    100
  ).toFixed(2);

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6",
        className,
      )}
    >
      <MetricCard
        icon={<TrendingUpIcon />}
        title="Nombre d'appels journaliers estimés"
        value={`${sumDailyCalls} appels`}
        badgeValue={`${percentageChange}%`}
        badgeText="par rapport à hier"
      />
      <MetricCard
        icon={<CheckIcon />}
        title="Taux de confiance sur la prédiction"
        value="85%"
        badgeValue="+5%"
      />
      <MetricCard
        icon={<XIcon className="text-gray-800 dark:text-white/90" />}
        title="Erreurs de prédiction sur les 7 derniers jours"
        value="9%"
        badgeValue="-5%"
      />
    </div>
  );
};
