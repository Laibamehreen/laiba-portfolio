import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const imagePath = "C:/Users/laiba/.gemini/antigravity-ide/scratch/laiba-portfolio/pic.png";

  try {
    if (fs.existsSync(imagePath)) {
      const fileBuffer = fs.readFileSync(imagePath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "image/png",
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
