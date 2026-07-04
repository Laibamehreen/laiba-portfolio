import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const sourcePath = "C:/Users/laiba/.gemini/antigravity-ide/scratch/laiba-portfolio/Laiba Mehreen _ CV.pdf";
  const publicDir = "C:/Users/laiba/.gemini/antigravity-ide/scratch/laiba-portfolio/public";
  const destPath = path.join(publicDir, "Laiba_CV.pdf");

  try {
    if (fs.existsSync(sourcePath)) {
      // Create public directory if it doesn't exist (failsafe)
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      
      // Auto-copy the real CV to the public folder
      fs.copyFileSync(sourcePath, destPath);

      const fileBuffer = fs.readFileSync(destPath);
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=\"Laiba_Mehreen_CV.pdf\"",
        },
      });
    } else {
      // Fallback: If source is missing, check if it was already copied to dest
      if (fs.existsSync(destPath)) {
        const fileBuffer = fs.readFileSync(destPath);
        return new NextResponse(fileBuffer, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=\"Laiba_Mehreen_CV.pdf\"",
          },
        });
      }
      return NextResponse.json({ error: "CV file not found at local workspace path" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to process CV download" }, { status: 500 });
  }
}
