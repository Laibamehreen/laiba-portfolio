import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#F8FAFC] dark:bg-[#080B16] text-slate-900 dark:text-[#F8FAFC] selection:bg-lavender-400/20 selection:text-lavender-300 transition-colors duration-300`}>
        <div className="min-h-screen flex flex-col justify-between">
          {children}
        </div>
      </body>
    </html>
  );
}
