import { DataProps } from "@/types/data";

export async function getData(
  n_days: number | null,
  selectedModel: string,
): Promise<DataProps> {
  let name_model;
  if (selectedModel === "Merlain-Week") {
    name_model = "week";
  } else if (selectedModel === "Merlain-2-Weeks") {
    name_model = "two-weeks";
  } else if (selectedModel === "Merlain-Month") {
    name_model = "month";
  } else {
    throw new Error("Invalid model selected");
  }

  const url = `http://localhost:3000/api?selectedModel=${encodeURIComponent(name_model)}${
    n_days !== null ? `&n_days=${n_days}` : ""
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch data: ${response.status} - ${errorText}`);
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}