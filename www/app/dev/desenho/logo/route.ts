import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV === "production") notFound();

  const filePath = path.join(process.cwd(), ".trae", "docs", "design", "logo.png");
  const buffer = await readFile(filePath);

  return new NextResponse(buffer, {
    headers: {
      "content-type": "image/png",
      "cache-control": "no-store"
    }
  });
}

