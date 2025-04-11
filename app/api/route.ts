import { parse } from "csv-parse/sync";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const selectedModel = searchParams.get("selectedModel");
    const nDays = Math.max(0, parseInt(searchParams.get("n_days") || "0", 10));

    if (!selectedModel) {
      return NextResponse.json(
        { error: "Le paramètre 'selectedModel' est requis." },
        { status: 400 },
      );
    }

    const predPath = path.join(
      process.cwd(),
      "data",
      `pred-${selectedModel}.csv`,
    );
    const realPath = path.join(
      process.cwd(),
      "data",
      `test-${selectedModel}.csv`,
    );
    const futuresPath = path.join(
      process.cwd(),
      "data",
      `futures-${selectedModel}.csv`,
    );

    if (!fs.existsSync(predPath)) {
      return NextResponse.json(
        { error: `Le fichier prédictions est introuvable : ${predPath}` },
        { status: 404 },
      );
    }

    if (!fs.existsSync(realPath)) {
      return NextResponse.json(
        { error: `Le fichier réel est introuvable : ${realPath}` },
        { status: 404 },
      );
    }

    if (!fs.existsSync(futuresPath)) {
      return NextResponse.json(
        { error: `Le fichier futur est introuvable : ${futuresPath}` },
        { status: 404 },
      );
    }

    const predContent = fs.readFileSync(predPath, "utf-8");
    const realContent = fs.readFileSync(realPath, "utf-8");
    const futuresContent = fs.readFileSync(futuresPath, "utf-8");

    const predRecords = parse(predContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const realRecords = parse(realContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const futuresRecords = parse(futuresContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const maxPredDays = predRecords.length;
    const maxRealDays = realRecords.length;

    const validNDays = Math.min(nDays, maxPredDays, maxRealDays);

    const predictions = predRecords
      .slice(-validNDays * 24)
      .map((record: any) => ({
        date: record.Date,
        value: Number(record.Predictions),
      }));

    const reals = realRecords.slice(-validNDays * 24).map((record: any) => ({
      date: record.Date,
      value: Number(record.Predictions),
    }));

    const futures = futuresRecords
      .slice(0, validNDays * 24)
      .map((record: any) => ({
        date: record.Date,
        value: Number(record.Predictions),
      }));

    return NextResponse.json({ predictions, reals, futures });
  } catch (error) {
    console.error("Erreur lors de la lecture des fichiers CSV :", error);
    return NextResponse.json(
      { error: "Impossible de lire les fichiers CSV." },
      { status: 500 },
    );
  }
}
