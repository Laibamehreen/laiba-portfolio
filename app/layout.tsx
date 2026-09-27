import type { Metadata, Viewport } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";
import CommandPalette from "@/components/command-palette";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#080B16",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Laiba Mehreen | Software Engineer",
  description:
    "BSCS student at COMSATS University with practical software engineering experience in Java, Spring Boot, REST APIs, database architecture, React, and Next.js.",
  keywords: [
    "Laiba Mehreen",
    "Laiba",
    "Software Engineer",
    "Java Developer",
    "Spring Boot",
    "REST APIs",
    "Spring Data JPA",
    "Spring Security",
    "PostgreSQL",
    "MongoDB",
    "React",
    "Next.js",
    "COMSATS University",
    "Portfolio",
    "Developer CV"
  ],
  authors: [{ name: "Laiba Mehreen" }],
  creator: "Laiba Mehreen",
  openGraph: {
    title: "Laiba Mehreen | Software Engineer",
    description:
      "BSCS student at COMSATS University with practical software engineering experience in Java, Spring Boot, REST APIs, database architecture, React, and Next.js.",
    type: "website",
    locale: "en_US",
    siteName: "Laiba Mehreen - Software Engineer CV",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laiba Mehreen | Software Engineer",
    description:
      "BSCS student at COMSATS University with practical software engineering experience in Java, Spring Boot, REST APIs, database architecture, React, and Next.js.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="relative font-sans antialiased bg-[#F8FAFC] dark:bg-[#080B16] text-slate-900 dark:text-[#F8FAFC] selection:bg-lavender-400/20 selection:text-lavender-300 transition-colors duration-300 overflow-x-clip w-full max-w-full"
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('theme');
                if (saved === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <div className="relative min-h-screen flex flex-col justify-between overflow-x-clip w-full">
          {/* Top Scroll Progress Bar */}
          <ScrollProgress />

          {/* Headless Command Palette (⌘K / Ctrl+K) */}
          <CommandPalette showTrigger={false} />

          {/* Sticky/Fixed Minimal Glass Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="relative flex-grow">
            {children}
          </main>

          {/* Minimal Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
