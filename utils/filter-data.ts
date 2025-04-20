export type DataItem = { date: string; value: number };
export type DataProps = {
  predictions: DataItem[];
  reals: DataItem[];
  futures: DataItem[];
};

export function filterDataByDateRange(
  data: DataProps,
  startDate: string | null,
  endDate: string | null,
): DataProps {
  const isWithinRange = (date: string) => {
    const dateObj = new Date(date);
    const isAfterStartDate = startDate ? dateObj >= new Date(startDate) : true;
    const isBeforeEndDate = endDate ? dateObj <= new Date(endDate) : true;
    return isAfterStartDate && isBeforeEndDate;
  };

  return {
    predictions: data.predictions.filter((item) => isWithinRange(item.date)),
    reals: data.reals.filter((item) => isWithinRange(item.date)),
    futures: data.futures.filter((item) => isWithinRange(item.date)),
  };
}