export async function getDevicesUsedData(
  timeFrame?: "monthly" | "yearly" | (string & {}),
) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    {
      name: "Desktop",
      percentage: 0.65,
      amount: 1625,
    },
    {
      name: "Tablet",
      percentage: 0.1,
      amount: 250,
    },
    {
      name: "Mobile",
      percentage: 0.2,
      amount: 500,
    },
    {
      name: "Unknown",
      percentage: 0.05,
      amount: 125,
    },
  ];

  if (timeFrame === "yearly") {
    data[0].amount = 19500;
    data[1].amount = 3000;
    data[2].amount = 6000;
    data[3].amount = 1500;
  }

  return data;
}

export async function getPaymentsOverviewData(
  timeFrame?: "monthly" | "yearly" | (string & {}),
) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (timeFrame === "yearly") {
    return {
      received: [
        { x: 2020, y: 450 },
        { x: 2021, y: 620 },
        { x: 2022, y: 780 },
        { x: 2023, y: 920 },
        { x: 2024, y: 1080 },
      ],
      due: [
        { x: 2020, y: 1480 },
        { x: 2021, y: 1720 },
        { x: 2022, y: 1950 },
        { x: 2023, y: 2300 },
        { x: 2024, y: 1200 },
      ],
    };
  }

  return {
    received: [
      { x: "Jan", y: 0 },
      { x: "Fév", y: 20 },
      { x: "Mar", y: 35 },
      { x: "Avr", y: 45 },
      { x: "Mai", y: 35 },
      { x: "Juin", y: 55 },
      { x: "Juil", y: 65 },
      { x: "Août", y: 50 },
      { x: "Sept", y: 65 },
      { x: "Oct", y: 75 },
      { x: "Nov", y: 60 },
      { x: "Déc", y: 75 },
    ],
    due: [
      { x: "Jan", y: 15 },
      { x: "Fév", y: 9 },
      { x: "Mar", y: 17 },
      { x: "Avr", y: 32 },
      { x: "Mao", y: 25 },
      { x: "Juin", y: 68 },
      { x: "Juil", y: 80 },
      { x: "Août", y: 68 },
      { x: "Sept", y: 84 },
      { x: "Oct", y: 94 },
      { x: "Nov", y: 74 },
      { x: "Déc", y: 62 },
    ],
  };
}

export async function getWeeksProfitData(timeFrame?: string) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (timeFrame === "last week") {
    return {
      sales: [
        { x: "Lun", y: 33 },
        { x: "Mar", y: 44 },
        { x: "Mer", y: 31 },
        { x: "jeu", y: 57 },
        { x: "Ven", y: 12 },
        { x: "Sam", y: 33 },
        { x: "Dim", y: 55 },
      ],
      revenue: [
        { x: "Lun", y: 10 },
        { x: "Mar", y: 20 },
        { x: "Mer", y: 17 },
        { x: "Jeu", y: 7 },
        { x: "Ven", y: 10 },
        { x: "Sam", y: 23 },
        { x: "Dim", y: 13 },
      ],
    };
  }

  return {
    sales: [
      { x: "Lun", y: 44 },
      { x: "Mar", y: 55 },
      { x: "Mer", y: 41 },
      { x: "Jeu", y: 67 },
      { x: "Ven", y: 22 },
      { x: "Sam", y: 43 },
      { x: "Dim", y: 65 },
    ],
    revenue: [
      { x: "Lun", y: 13 },
      { x: "Mar", y: 23 },
      { x: "Mer", y: 20 },
      { x: "Jeu", y: 8 },
      { x: "Ven", y: 13 },
      { x: "Sam", y: 27 },
      { x: "Dim", y: 15 },
    ],
  };
}

export async function getCampaignVisitorsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    total_visitors: 784_000,
    performance: -1.5,
    chart: [
      { x: "L", y: 168 },
      { x: "M", y: 385 },
      { x: "M", y: 201 },
      { x: "J", y: 298 },
      { x: "V", y: 187 },
      { x: "S", y: 195 },
      { x: "D", y: 291 },
    ],
  };
}

export async function getVisitorsAnalyticsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112, 123, 212, 270,
    190, 310, 115, 90, 380, 112, 223, 292, 170, 290, 110, 115, 290, 380, 312,
  ].map((value, index) => ({ x: index + 1 + "", y: value }));
}

export async function getCostsPerInteractionData() {
  return {
    avg_cost: 560.93,
    growth: 2.5,
    chart: [
      {
        name: "Google Ads",
        data: [
          { x: "Sept", y: 15 },
          { x: "Oct", y: 12 },
          { x: "Nov", y: 61 },
          { x: "Déc", y: 118 },
          { x: "Jan", y: 78 },
          { x: "Fév", y: 125 },
          { x: "Mar", y: 165 },
          { x: "Avr", y: 61 },
          { x: "Mai", y: 183 },
          { x: "Juin", y: 238 },
          { x: "Juil", y: 237 },
          { x: "Août", y: 235 },
        ],
      },
      {
        name: "Facebook Ads",
        data: [
          { x: "Sept", y: 75 },
          { x: "Oct", y: 77 },
          { x: "Nov", y: 151 },
          { x: "Déc", y: 72 },
          { x: "Jan", y: 7 },
          { x: "Fév", y: 58 },
          { x: "Mar", y: 60 },
          { x: "Avr", y: 185 },
          { x: "Mai", y: 239 },
          { x: "Juin", y: 135 },
          { x: "Juil", y: 119 },
          { x: "Août", y: 124 },
        ],
      },
    ],
  };
}