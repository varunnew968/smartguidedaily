
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
    default: "SmartGuideDaily — Practical Guides & Free Online Tools",
    template: "%s | SmartGuideDaily",
  },
  description:
    "Helpful, practical guides and free online tools for technology, AI, careers, money, business, and everyday tasks.",
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    title: "SmartGuideDaily",
    description:
      "Practical guides and free tools for smarter everyday decisions.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartGuideDaily",
    description: "Practical guides and free online tools.",
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
