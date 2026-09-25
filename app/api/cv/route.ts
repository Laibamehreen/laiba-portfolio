import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function getCvBuffer(): { buffer: Buffer; filename: string } | null {
  const candidates = [
    path.join(process.cwd(), "public", "Laiba_Mehreen_Resume.pdf"),
    path.join(process.cwd(), "public", "Laiba_Mehreen_CV.pdf"),
    path.join(process.cwd(), "public", "Laiba_CV.pdf"),
    path.join(process.cwd(), "Laiba Mehreen _ CV.pdf"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      try {
        const buffer = fs.readFileSync(candidate);
        return { buffer, filename: "Laiba_Mehreen_Resume.pdf" };
      } catch (err) {
        console.error("Error reading candidate:", candidate, err);
      }
    }
  }
  return null;
}

export async function GET() {
  const result = getCvBuffer();

  if (!result) {
    return NextResponse.json(
      { error: "Resume file not found" },
      { status: 404 }
    );
  }

  return new NextResponse(result.buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${result.filename}"`,
      "Content-Length": result.buffer.length.toString(),
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export async function HEAD() {
  const result = getCvBuffer();

  if (!result) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${result.filename}"`,
      "Content-Length": result.buffer.length.toString(),
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
