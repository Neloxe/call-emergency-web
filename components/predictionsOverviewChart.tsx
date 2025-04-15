import { DataProps } from "@/types/data";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function PredictionsOverviewChart({
  predictions,
  reals,
  futures,
  dateRange,
}: {
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
  dateRange: [string | null, string | null];
}) {
  const allDatesSet = new Set([
    ...predictions.map((prediction) => prediction.date),
    ...reals.map((real) => real.date),
    ...futures.map((future) => future.date),
  ]);

  const currentDate = new Date("2024-10-31T23:00:00"); // TODO: à remplacer par la date actuelle

  const allDates = Array.from(allDatesSet).sort();

  const getDataForDates = (
    data: { date: string; value: number }[],
    allDates: string[],
  ): (number | null)[] => {
    return allDates.map((date) => {
      const entry = data.find((item) => item.date === date);
      return entry ? entry.value : null;
    });
  };

  const [startDate, endDate] = dateRange;

  const filteredDates = allDates.filter((date) => {
    const dateObj = new Date(date);
    const isAfterStartDate = startDate ? dateObj >= new Date(startDate) : true;
    const isBeforeEndDate = endDate ? dateObj <= new Date(endDate) : true;
    return isAfterStartDate && isBeforeEndDate;
  });

  const filteredPredictionsData = getDataForDates(predictions, filteredDates);
  const filteredRealsData = getDataForDates(reals, filteredDates);
  const filteredFuturesData = getDataForDates(futures, filteredDates);

  const filteredMergeDate = futures.length > 0 ? futures[0].date : null;
  const filteredMergeIndex = filteredMergeDate
    ? filteredDates.indexOf(filteredMergeDate)
    : -1;

  const filteredCombinedSeriesData = filteredPredictionsData.map(
    (value, index) =>
      index < filteredMergeIndex ? value : filteredFuturesData[index],
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
      tickAmount: filteredDates.length > 167 ? 10 : 24,
      title: {
        text: filteredDates.length > 167 ? "Dates" : "Heures",
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
              color: "#5750F1",
              data: filteredCombinedSeriesData,
            },
            {
              name: "Réels",
              type: "line",
              color: "#0ABEF9",
              data: filteredRealsData,
            },
          ]}
          height={310}
        />
      </div>
    </div>
  );
}
