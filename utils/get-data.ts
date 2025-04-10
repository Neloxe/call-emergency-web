export async function getData(
  n_days: number,
  selectedModel: string,
): Promise<{ predictions: number[]; reals: number[] }> {
  const baseUrl = typeof window === "undefined" ? "http://localhost:3000" : "";
  const response = await fetch(
    `${baseUrl}/api/read-data?selectedModel=${encodeURIComponent(selectedModel)}&n_days=${n_days}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}