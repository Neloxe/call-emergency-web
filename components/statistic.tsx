"use client";

import React from "react";
import Badge from "@/components/badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  TrendingUpIcon,
  CheckIcon,
  XIcon,
} from "@/assets/icons";

interface MetricCardProps {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  value: string;
  badgeValue: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  badgeValue,
}) => {
  const isNegative = badgeValue.startsWith("-");
  const computedBadgeColor = isNegative ? "error" : "success";
  const computedBadgeIcon = isNegative ? <ArrowDownIcon /> : <ArrowUpIcon />;

  return (
    <div className="grid gap-4 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
        {React.cloneElement(icon, {
          className: "text-gray-800 dark:text-white/90",
        })}
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </span>
          <h4 className="text-title-sm mt-2 font-bold text-gray-800 dark:text-white/90">
            {value}
          </h4>
        </div>
        <Badge color={computedBadgeColor}>
          {computedBadgeIcon}
          {badgeValue}
        </Badge>
      </div>
    </div>
  );
};

export const Statistics = () => {
  return (
    <div className="col-span-12 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 xl:col-span-12">
      <MetricCard
        icon={<TrendingUpIcon />}
        title="Nombre d'appels journaliers estimés"
        value="103"
        badgeValue="+3%"
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
