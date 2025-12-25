import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "TailwindSQL - SQL Queries with Tailwind Syntax",
  description: "Like TailwindCSS, but for SQL queries in React Server Components. className your way to database queries!, learn SQL with TailwindCSS! Branch42",
  keywords: ["SQL", "TailwindCSS", "React", "Server Components", "SQLite", "database", "queries", "Next.js", "Branch42"],
  authors: [{ name: "TailwindSQL <> Branch42" }],
  creator: "TailwindSQL",
  metadataBase: new URL("https://branch42.com"),
  openGraph: {
    title: "TailwindSQL - SQL Queries with Tailwind Syntax",
    description: "Like TailwindCSS, but for SQL queries. className your way to database queries in React Server Components!",
    siteName: "TailwindSQL <> Branch42",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TailwindSQL <> Branch42",
    description: "Like TailwindCSS, but for SQL queries. A fun experiment!",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="gradient-bg grid-pattern min-h-screen">{children}</body>
    </html>
  );
}
