import { NextResponse } from "next/server";
import fs from "fs";
import csvParser from "csv-parser";

export async function GET(req: Request) {
  // try {
  //   const fakeData = {
  //     predictions: Array(24).fill(0).map(() => Math.random() * 100),
  //     reals: Array(24).fill(0).map(() => Math.random() * 100),
  //   };

  //   return NextResponse.json(fakeData);
  // } catch (error) {
  //   console.error("Unexpected error in API route:", error);
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }

  try {
    const predictions: number[][] = [];
    const reals: number[][] = [];

    const filePaths = [
      { path: `./data/pred_week.csv`, target: predictions },
      { path: `./data/pred_week.csv`, target: reals },
    ];

    // const filePaths = [
    //   { path: `./src/data/predictions.csv`, target: predictions },
    //   { path: `./src/data/reals.csv`, target: reals },
    // ];

    await Promise.all(
      filePaths.map(({ path, target }) => {
        return new Promise<void>((resolve, reject) => {
          let isFirstRow = true;

          fs.createReadStream(path)
            .pipe(csvParser({ headers: false }))
            .on("data", (row) => {
              if (isFirstRow) {
                isFirstRow = false;
                return;
              }
              const values = Object.values(row).map((value) => Number(value));
              target.push(values);
            })
            .on("end", resolve)
            .on("error", (err) => {
              console.error(`Error reading file ${path}:`, err);
              reject(err);
            });
        });
      })
    );

    const flatPredictions = predictions.flat();
    const flatReals = reals.flat();

    const fakeData = {
      predictions: flatPredictions,
      reals: flatReals,
    };

    return NextResponse.json(fakeData);
  } catch (error) {
    console.error("Unexpected error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}