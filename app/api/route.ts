import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const selectedModel = searchParams.get("selectedModel");
    const nDays = Math.max(0, parseInt(searchParams.get("n_days") || "0", 10)); // Ensure nDays is non-negative

    if (!selectedModel) {
      return NextResponse.json(
        { error: "Le paramètre 'selectedModel' est requis." },
        { status: 400 }
      );
    }

    const predPath = path.join(process.cwd(), "data", `pred-${selectedModel}.csv`);
    const realPath = path.join(process.cwd(), "data", "real.csv");

    if (!fs.existsSync(predPath)) {
      return NextResponse.json(
        { error: `Le fichier prédictions est introuvable : ${predPath}` },
        { status: 404 }
      );
    }

    if (!fs.existsSync(realPath)) {
      return NextResponse.json(
        { error: `Le fichier réel est introuvable : ${realPath}` },
        { status: 404 }
      );
    }

    const predContent = fs.readFileSync(predPath, "utf-8");
    const realContent = fs.readFileSync(realPath, "utf-8");

    const predRecords = parse(predContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const realRecords = parse(realContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const maxPredDays = predRecords.length;
    const maxRealDays = realRecords.length;

    const validNDays = Math.min(nDays, maxPredDays, maxRealDays); // Ensure nDays does not exceed available records

    const predictions = predRecords
      .map((record: any) => Number(record.Predictions))
      .slice(-validNDays);

    const reals = realRecords
      .map((record: any) => Number(record.Calls))
      .slice(-validNDays);

    return NextResponse.json({ predictions, reals });
  } catch (error) {
    console.error("Erreur lors de la lecture des fichiers CSV :", error);
    return NextResponse.json(
      { error: "Impossible de lire les fichiers CSV." },
      { status: 500 }
    );
  }
}
