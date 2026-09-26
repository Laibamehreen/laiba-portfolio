import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const possiblePaths = [
    path.join(process.cwd(), "pic.png"),
    path.join(process.cwd(), "public", "pic.png"),
    "C:/Users/laiba/.gemini/antigravity-ide/scratch/laiba-portfolio/pic.png"
  ];

  let resolvedPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      resolvedPath = p;
      break;
    }
  }

  try {
    if (resolvedPath) {
      const fileBuffer = fs.readFileSync(resolvedPath);
      const isJpeg = fileBuffer[0] === 0xFF && fileBuffer[1] === 0xD8;
      const contentType = isJpeg ? "image/jpeg" : "image/png";
      return new NextResponse(new Uint8Array(fileBuffer), {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      });
    } else {
      // Fallback if not found
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to read image" }, { status: 500 });
  }
}
