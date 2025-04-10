import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { selectedModel, n_days } = req.query;

  if (!selectedModel || typeof selectedModel !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'selectedModel' parameter" });
  }

  const days = parseInt(n_days as string, 10) || 7;

  let fileName = "pred-week.csv";
  if (selectedModel === "Merlain-2-weeks") {
    fileName = "pred-two-weeks.csv";
  } else if (selectedModel === "Merlain-month") {
    fileName = "pred-month.csv";
  }

  const filePath = path.join(process.cwd(), `data/${fileName}`);
  const predictions: number[][] = [];

  fs.createReadStream(filePath)
    .pipe(csvParser({ headers: false }))
    .on("data", (row) => {
      const values = Object.values(row).map((value) => Number(value));
      predictions.push(values);
    })
    .on("end", () => {
      const flatPredictions = predictions.flat();
      res.status(200).json({
        predictions: flatPredictions.slice(-days * 24),
        reals: flatPredictions.slice(-days * 24), // Adjust if you have real data
      });
    })
    .on("error", (error) => {
      res.status(500).json({ error: error.message });
    });
}