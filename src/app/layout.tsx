import type { Metadata, Viewport } from "next";
import "./globals.css";
import CalFloatingButton from "@/components/CalFloatingButton";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "TailwindSQL by Branch42 | Learn SQL in Tailwind Syntax",
  description:
    "Branch42 agency forked TailwindSQL to help frontend developers learn SQL with Tailwind-style className syntax. Practice live queries, see instant results, and book a consult at hello@branch42.com.",
  keywords: [
    "TailwindSQL",
    "Branch42",
    "SQL for frontend developers",
    "TailwindCSS queries",
    "Next.js",
    "React Server Components",
    "SQLite playground",
    "learn SQL fast",
    "hello@branch42.com",
    "product development agency",
  ],
  authors: [{ name: "Branch42" }],
  creator: "Branch42 Agency",
  metadataBase: new URL("https://branch42.com"),
  openGraph: {
    title: "TailwindSQL by Branch42 | Learn SQL in Tailwind Syntax",
    description: "Forked from TailwindSQL and crafted by Branch42 for frontend devs who want SQL superpowers. Instant results, live playground, and agency support at hello@branch42.com.",
    siteName: "TailwindSQL by Branch42",
    type: "website",
    locale: "en_US",
    url: "https://branch42.com",
    emails: ["hello@branch42.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TailwindSQL by Branch42",
    description: "We forked TailwindSQL to teach SQL with Tailwind-style classNames. Built by Branch42. Reach us at hello@branch42.com.",
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
      <body className="gradient-bg grid-pattern min-h-screen">
        {children}
        <CalFloatingButton />
      </body>
    </html>
  );
}
