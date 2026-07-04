import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";
import BackgroundParticles from "@/components/background-particles";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Laiba | CS Student & Full Stack Developer Portfolio",
  description: "Explore the modern portfolio of Laiba, a Computer Science Student building high-performance, full-stack applications with Next.js, React, TypeScript, and AI integrations.",
  keywords: ["Laiba", "Portfolio", "Full Stack Developer", "Computer Science Student", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  authors: [{ name: "Laiba" }],
  openGraph: {
    title: "Laiba | CS Student & Full Stack Developer Portfolio",
    description: "Explore the modern portfolio of Laiba, a Computer Science Student building high-performance, full-stack applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laiba | CS Student & Full Stack Developer Portfolio",
    description: "Explore the modern portfolio of Laiba, a Computer Science Student building high-performance, full-stack applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased bg-[#070A13] text-foreground`}>
        {/* Animated Particles Canvas */}
        <BackgroundParticles />

        {/* Custom Follow Cursor & Glow Spotlight */}
        <CustomCursor />

        {/* Layout wrapper */}
        <div className="relative z-10 min-h-screen flex flex-col justify-between">
          {children}
        </div>
      </body>
    </html>
  );
}
