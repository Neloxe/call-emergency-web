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
}: DataProps) {
  // Combine all dates from predictions, reals, and futures
  const allDatesSet = new Set([
    ...predictions.map((prediction) => prediction.date),
    ...reals.map((real) => real.date),
    ...futures.map((future) => future.date),
  ]);

  const currentDate = new Date("2024-10-31T23:00:00Z"); // Example current date, replace with actual current date if needed

  // Convert the set to a sorted array
  const allDates = Array.from(allDatesSet).sort();

  // Determine the merge date
  const mergeDate = futures.length > 0 ? futures[0].date : null;
  const mergeIndex = mergeDate ? allDates.indexOf(mergeDate) : -1;

  // Map data to the combined dates array
  const getDataForDates = (
    data: { date: string; value: number }[],
    allDates: string[],
  ): (number | null)[] => {
    return allDates.map((date) => {
      const entry = data.find((item) => item.date === date);
      return entry ? entry.value : null;
    });
  };

  const predictionsData = getDataForDates(predictions, allDates);
  const realsData = getDataForDates(reals, allDates);
  const futuresData = getDataForDates(futures, allDates);

  // Create a single combined series for predictions and futures
  const combinedSeriesData = predictionsData.map((value, index) =>
    index < mergeIndex ? value : futuresData[index],
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
          borderColor: "#FF0000", // Couleur rouge pour plus de visibilité
          borderWidth: 2, // Épaisseur de la ligne
          label: {
            show: true,
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
      categories: allDates,
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

          // Check if the date is today's date
          const isToday =
            date.toISOString().split("T")[0] ===
            currentDate.toISOString().split("T")[0];

          // Format the date based on the range of dates
          if (allDates.length > 24 * 7) {
            if (isToday) {
              return "Aujourd'hui";
            }
            return date.toISOString().split("T")[0];
          }

          // If 00:00, show only the date
          if (date.getHours() === 0 && date.getMinutes() === 0) {
            return date.toISOString().split("T")[0];
          } else {
            return date.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            });
          }
        },
        rotate: -45, // Rotation des étiquettes
        rotateAlways: true, // Forcer la rotation même si les étiquettes ne se chevauchent pas
        hideOverlappingLabels: false, // Ne pas masquer les étiquettes qui se chevauchent
      },
      tickAmount: allDates.length > 167 ? 10 : 20,
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
              color: "#5750F1",
              data: combinedSeriesData,
            },
            {
              name: "Réels",
              type: "line",
              color: "#0ABEF9",
              data: realsData,
            },
          ]}
          height={310}
        />
      </div>
    </div>
  );
}
