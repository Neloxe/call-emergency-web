// import fs from "fs";
// import path from "path";
// import csvParser from "csv-parser";
// import { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { selectedModel } = req.query;

//   if (!selectedModel || typeof selectedModel !== "string") {
//     return res.status(400).json({ error: "Missing or invalid 'selectedModel' parameter" });
//   }

//   const predictions: number[][] = [];
//   const reals: number[][] = [];

//   const filePaths = [
//     { path: path.join(process.cwd(), `data/pred_${selectedModel}.csv`), target: predictions },
//     { path: path.join(process.cwd(), `data/test_${selectedModel}.csv`), target: reals },
//   ];

//   let completed = 0;

//   filePaths.forEach(({ path, target }) => {
//     let isFirstRow = true;

//     fs.createReadStream(path)
//       .pipe(csvParser({ headers: false }))
//       .on("data", (row) => {
//         if (isFirstRow) {
//           isFirstRow = false;
//           return;
//         }
//         const values = Object.values(row).map((value) => Number(value));
//         target.push(values);
//       })
//       .on("end", () => {
//         completed++;
//         if (completed === filePaths.length) {
//           const flatPredictions = predictions.flat();
//           const flatReals = reals.flat();
//           res.status(200).json({
//             predictions: flatPredictions,
//             reals: flatReals,
//           });
//         }
//       })
//       .on("error", (error) => {
//         res.status(500).json({ error: error.message });
//       });
//   });
// }