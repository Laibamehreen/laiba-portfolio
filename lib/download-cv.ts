/**
 * Bulletproof CV/Resume downloader for all browsers (Chrome, Edge, Safari, Firefox).
 * Fetches the binary blob into memory and creates an object URL, which forces the
 * browser to write the physical file to the user's Downloads folder without opening
 * in a new tab or being intercepted by the in-browser PDF viewer.
 */
export async function downloadResumeFile(
  filename: string = "Laiba_Mehreen_Resume.pdf"
): Promise<void> {
  try {
    // 1. Fetch from /api/cv which has Content-Disposition: attachment header
    const response = await fetch("/api/cv");
    
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const blob = await response.blob();
    
    // 2. Create in-memory blob URL
    const blobUrl = window.URL.createObjectURL(blob);
    
    // 3. Create invisible link element with explicit download attribute
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = blobUrl;
    link.setAttribute("download", filename);
    link.setAttribute("rel", "noopener noreferrer");
    document.body.appendChild(link);
    
    // 4. Trigger programmatic download
    link.click();
    
    // 5. Clean up blob after short timeout
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      window.URL.revokeObjectURL(blobUrl);
    }, 1500);
  } catch (error) {
    console.error("Blob download failed, trying direct attachment navigation:", error);
    // Fallback: Direct attachment navigation
    const fallbackLink = document.createElement("a");
    fallbackLink.href = "/api/cv";
    fallbackLink.setAttribute("download", filename);
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    setTimeout(() => {
      if (document.body.contains(fallbackLink)) {
        document.body.removeChild(fallbackLink);
      }
    }, 1000);
  }
}
