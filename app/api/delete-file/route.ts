import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function DELETE() {
  const filesToDelete = ["data.csv", "errors.csv"];
  const folderPath = path.join(process.cwd(), "data");

  try {
    for (const fileName of filesToDelete) {
      const filePath = path.join(folderPath, fileName);
      const absolutePath = path.resolve(filePath);

      try {
        await fs.access(absolutePath);
        await fs.unlink(absolutePath);
      } catch {
        console.warn(`File ${fileName} does not exist, skipping deletion.`);
      }
    }

    return NextResponse.json(
      { message: "Files deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `Error deleting files: ${error instanceof Error ? error.message : String(error)}`
    );
    return NextResponse.json(
      { message: "Error deleting files" },
      { status: 500 }
    );
  }
}