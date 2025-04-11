"use client";

//TODO:
// - choisir une date

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

type PropsType = {
  predictions: number[];
  reals: number[];
};

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function PredictionsOverviewChart({ predictions, reals }: PropsType) {
  const options: ApexOptions = {
    legend: {
      show: false,
    },
    colors: ["#5750F1", "#0ABEF9"],
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
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
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
      categories: predictions.map((_, index) => predictions[index][""]),
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
        formatter: (value) => value.toString(),
      },
      title: {
        text: predictions.length > 167 ? "Jours et heures" : "Heures",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
        },
      },
      min: 0,
      max: predictions.length - 1,
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
              data: predictions.flatMap((prediction) => prediction),
            },
            {
              name: "Réels",
              data: reals.flatMap((real) => real),
            },
          ]}
          type="area"
          height={310}
        />
      </div>
    </div>
  );
}
