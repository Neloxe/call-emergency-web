import { useState, useEffect } from "react";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import { COLORS } from "@/utils/color";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function PredictionsOverviewChart({
  data,
  dateRange,
}: {
  data: {
    predictions: {
      date: string;
      value: number;
    }[];
    reals: {
      date: string;
      value: number;
    }[];
    futures: {
      date: string;
      value: number;
    }[];
  };
  dateRange: [string | null, string | null];
}) {
  const { predictions, reals, futures } = data;

  const allDatesSet = new Set([
    ...predictions.map((prediction) => prediction.date),
    ...reals.map((real) => real.date),
    ...futures.map((future) => future.date),
  ]);

  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const now = new Date();
    return new Date(`2024-11-01T${now.toTimeString().split(" ")[0]}`);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(
        new Date(`2024-11-01T${now.toTimeString().split(" ")[0]}`),
      );
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getDataForDates = (
    data: { date: string; value: number }[],
    allDates: string[],
  ): (number | null)[] => {
    return allDates.map((date) => {
      const entry = data.find((item) => item.date === date);
      return entry ? entry.value : null;
    });
  };

  const allDates = Array.from(allDatesSet).sort();
  const predictionsData = getDataForDates(predictions, allDates);
  const realsData = getDataForDates(reals, allDates);
  const futuresData = getDataForDates(futures, allDates);

  const mergeDate = futures.length > 0 ? futures[0].date : null;
  const mergeIndex = mergeDate ? allDates.indexOf(mergeDate) : -1;

  const combinedSeriesData = predictionsData.map((value, index) =>
    index < mergeIndex ? value : futuresData[index],
  );

  const [startDate, endDate] = dateRange;

  const filteredDates = allDates.filter((date) => {
    const dateObj = new Date(date);
    const isAfterStartDate = startDate ? dateObj >= new Date(startDate) : true;
    const isBeforeEndDate = endDate ? dateObj <= new Date(endDate) : true;
    return isAfterStartDate && isBeforeEndDate;
  });

  const filteredRealsData = realsData.slice(
    allDates.indexOf(filteredDates[0]),
    allDates.indexOf(filteredDates[filteredDates.length - 1]) + 1,
  );

  const filteredCombinedSeriesData = combinedSeriesData.slice(
    allDates.indexOf(filteredDates[0]),
    allDates.indexOf(filteredDates[filteredDates.length - 1]) + 1,
  );

  const options: ApexOptions = {
    legend: {
      show: false,
    },
    chart: {
      height: 310,
      type: "area",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: "zoom",
      },
      zoom: {
        enabled: true,
        type: "x",
      },
      fontFamily: "inherit",
    },
    annotations: {
      xaxis: [
        {
          x: new Date(currentDate).getTime(),
          borderColor: "#FF0000",
          borderWidth: 2,
          label: {
            text: "Présent",
            style: {
              color: "#fff",
              background: "#775DD0",
            },
          },
        },
      ],
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {},
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      marker: {
        show: true,
      },
    },
    xaxis: {
      categories: filteredDates,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: "normal",
          colors: "#333",
        },
        formatter: (value) => {
          if (!value) return "";
          const date = new Date(value);

          const isToday =
            date.toISOString().split("T")[0] ===
            currentDate.toISOString().split("T")[0];

          if (allDates.length > 24 * 7) {
            if (isToday) {
              return "Aujourd'hui";
            }
            return date.toISOString().split("T")[0];
          }

          const displayDate = new Date(date.getTime());
          if (date.getHours() === 0 && date.getMinutes() === 0) {
            return displayDate.toLocaleDateString("fr-FR", {
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
            });
          } else {
            return displayDate.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
            });
          }
        },
        rotate: -45,
        rotateAlways: true,
        hideOverlappingLabels: false,
      },
      tickAmount: allDates.length > 167 ? 10 : 24,
      title: {
        text: allDates.length > 167 ? "Dates" : "Heures",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
        },
      },
    },
    yaxis: {
      title: {
        text: "Appels",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
        },
      },
      labels: {
        formatter: (value) => Math.round(value).toString(),
      },
    },
  };

  return (
    <div className="-ml-4 -mr-5">
      <div className="h-[310px]">
        <Chart
          options={options}
          series={[
            {
              name: "Prédictions",
              type: "line",
              color: COLORS.ORANGE,
              data: filteredCombinedSeriesData,
            },
            {
              name: "Réels",
              type: "line",
              color: COLORS.BLUE,
              data: filteredRealsData,
            },
          ]}
          height={310}
        />
      </div>
    </div>
  );
}
