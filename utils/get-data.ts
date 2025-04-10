export async function getData(
  n_days: number,
  selectedModel: string,
): Promise<{ predictions: number[]; reals: number[] }> {

  let name_model;
  if (selectedModel === "Merlain-Week") {
    name_model = "week";
  } else if (selectedModel === "Merlain-2-Weeks") {
    name_model = "two_weeks";
  } else if (selectedModel === "Merlain-Month") {
    name_model = "month";
  } else {
    throw new Error("Invalid model selected");
  }

  const url = `http://localhost:3000/api?selectedModel=${encodeURIComponent(name_model)}&n_days=${n_days}`;
  
  console.log("Fetching data from URL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch data: ${response.status} - ${errorText}`);
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  console.log("Response status:", response.status);

  return response.json();
}