import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://smartguidedaily.vercel.app"
).replace(/\/$/, "");

const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME || "SmartGuideDaily";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "SmartGuideDaily — Practical Guides for Everyday Life",
    template: "%s | SmartGuideDaily",
  },

  description:
    "Helpful, practical guides on technology, AI, careers, small business, and everyday how-to questions.",

  applicationName: siteName,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName,
    title: "SmartGuideDaily",
    description: "Practical guides for smarter everyday decisions.",
    url: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
  },

  verification: {
    google: "IIssjx62FOdmPclAh-lTxC8wq4CHQpGo18p7Ys8NPTA",
  },

  other: {
    "google-adsense-account": "ca-pub-6633143653612883",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>

        <Footer />

        {adsense && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
