import fs from "fs";
import csvParser from "csv-parser";
import { useEffect, useState } from "react";

export function getData(
  selectedModel: string,
  n_days: number,
): Promise<{ predictions: number[]; reals: number[] }> {
  return new Promise((resolve, reject) => {
    const predictions: number[][] = [];
    const reals: number[][] = [];

    const [name, setName] = useState<string>("");

    useEffect(() => {
      switch (selectedModel) {
        case "Merlain-week":
          setName("week");
          break;
        case "Merlain-2-weeks":
          setName("two-weeks");
          break;
        case "Merlain-month":
          setName("month");
          break;
        default:
          setName("week");
          break;
      }
    }, [selectedModel]);

    const filePaths = [
      { path: `./src/data/pred-${name}.csv`, target: predictions },
      { path: `./src/data/pred-${name}.csv`, target: reals },
    ];

    let completed = 0;

    filePaths.forEach(({ path, target }) => {
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
        .on("end", () => {
          completed++;
          if (completed === filePaths.length) {
            const flatPredictions = predictions.flat();
            const flatReals = reals.flat();
            resolve({
              predictions: flatPredictions.slice(-n_days * 24),
              reals: flatReals.slice(-n_days * 24),
            });
          }
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  });
}