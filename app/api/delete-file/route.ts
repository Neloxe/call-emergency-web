import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function DELETE() {
  const filePath = path.join(process.cwd(), "data", "data.csv");

  try {
    const absolutePath = path.resolve(filePath);

    try {
      await fs.access(absolutePath);
    } catch {
      return NextResponse.json(
        { message: "File does not exist, nothing to delete" },
        { status: 200 }
      );
    }

    await fs.unlink(absolutePath);
    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `Error deleting file: ${error instanceof Error ? error.message : String(error)}`
    );
    return NextResponse.json(
      { message: "Error deleting file" },
      { status: 500 }
    );
  }
}