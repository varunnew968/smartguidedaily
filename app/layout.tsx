
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://smartguideddaily.vercel.app"
).replace(/\/$/, "");

const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME || "SmartGuideDaily";

const adsenseClient =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ||
  "ca-pub-6633143653612883";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SmartGuideDaily — Know More. Do More.",
    template: "%s | SmartGuideDaily",
  },
  description:
    "Discover practical guides, useful digital tools, and clear explanations across technology, AI, careers, business, and everyday life.",
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    title: "SmartGuideDaily — Know More. Do More.",
    description:
      "Practical guides, useful tools, and clear explanations to help you learn and solve everyday problems.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartGuideDaily — Know More. Do More.",
    description: "Practical guides, useful digital tools, and clear explanations.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "IIssjx62FOdmPclAh-lTxC8wq4CHQpGo18p7Ys8NPTA",
  },
  other: {
    "google-adsense-account": adsenseClient,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
