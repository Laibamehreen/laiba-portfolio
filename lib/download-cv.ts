/**
 * Bulletproof CV/Resume downloader for all browsers (Chrome, Edge, Safari, Firefox).
 * Uses direct anchor download with fallback to static public asset.
 */
export async function downloadResumeFile(
  filename: string = "Laiba_Mehreen_Resume.pdf"
): Promise<void> {
  try {
    const link = document.createElement("a");
    link.href = "/api/cv";
    link.setAttribute("download", filename);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 1000);
  } catch (error) {
    console.error("Direct download failed, falling back to static asset:", error);
    try {
      const fallback = document.createElement("a");
      fallback.href = "/Laiba_Mehreen_Resume.pdf";
      fallback.setAttribute("download", filename);
      fallback.setAttribute("target", "_blank");
      document.body.appendChild(fallback);
      fallback.click();
      setTimeout(() => {
        if (document.body.contains(fallback)) {
          document.body.removeChild(fallback);
        }
      }, 1000);
    } catch {
      window.open("/Laiba_Mehreen_Resume.pdf", "_blank");
    }
  }
}
