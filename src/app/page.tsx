import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { UsedDevices } from "@/components/Charts/used-devices";
import { WeeksProfit } from "@/components/Charts/weeks-profit";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { get } from "http";
import { PredictionsOverview } from "@/components/PredictionsOverview";
import { Stats } from "@/components/Stats";
import { getRealsValues } from "@/utils/get-reals-values";
import { getPredictionsValues } from "@/utils/get-predictions-values";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  async function extract_prediction_reals_values(
    n_days: number,
  ): Promise<{ predictions: number[]; reals: number[] }> {
    const predictions_values: Promise<number[][]> = getPredictionsValues();
    const reals_values: Promise<number[][]> = getRealsValues();

    const raw_predictions = await predictions_values;
    const raw_reals = await reals_values;

    const predictions = raw_predictions.flat();
    const reals = raw_reals.flat();

    const extracted_predictions = predictions.slice(-n_days * 24);
    const extracted_reals = reals.slice(-n_days * 24);

    if (extracted_predictions && extracted_reals) {
      return { predictions: extracted_predictions, reals: extracted_reals };
    }
    throw new Error("Failed to extract prediction and real values.");
  }

  return (
    <>
      {/* <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup />
      </Suspense> */}

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <PredictionsOverview
          data={extract_prediction_reals_values(7 * 3)}
          className="col-span-12 xl:col-span-12"
          title={"Prédictions"}
        />
        <PredictionsOverview
          data={extract_prediction_reals_values(7)}
          className="col-span-12 xl:col-span-12"
          title={"Prédiction sur la semaine"}
        />
        <PredictionsOverview
          data={extract_prediction_reals_values(1)}
          className="col-span-12 xl:col-span-8"
          title={"Prédiction sur l'heure"}
        />
        <Stats className="col-span-12 xl:col-span-4" />

        {/* <WeeksProfit
          key={extractTimeFrame("weeks_profit")}
          timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
          className="col-span-12 xl:col-span-5"
        /> */}

        {/* <UsedDevices
          className="col-span-12 xl:col-span-5"
          key={extractTimeFrame("used_devices")}
          timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
        /> */}

        {/* <RegionLabels /> */}

        {/* <div className="col-span-12 grid xl:col-span-8">
          <Suspense fallback={<TopChannelsSkeleton />}>
            <TopChannels />
          </Suspense>
        </div> */}

        {/* <Suspense fallback={null}>
          <ChatsCard />
        </Suspense> */}
      </div>
    </>
  );
}
