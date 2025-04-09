import fs from "fs";
import csvParser from "csv-parser";

export function getPredictionsValues(): Promise<number[][]> {
  return new Promise((resolve, reject) => {
    const predictions: number[][] = [];
    const filePath = "./src/data/y_pred.csv";
    let isFirstRow = true;

    fs.createReadStream(filePath)
      .pipe(csvParser({ headers: false }))
      .on("data", (row) => {
        if (isFirstRow) {
          isFirstRow = false;
          return;
        }
        const values = Object.values(row).map((value) => Number(value));
        predictions.push(values);
      })
      .on("end", () => {
        resolve(predictions);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}