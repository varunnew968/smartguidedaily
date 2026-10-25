"use client";

import { useEffect, useRef } from "react";

type Placement = "content" | "sidebar" | "feed";
export default function AdSlot({ label = "Advertisement", placement = "content" }: { label?: string; placement?: Placement }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-6633143653612883";
  const slots: Record<Placement, string | undefined> = {
    content: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT,
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
    feed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FEED,
  };
  const slot = slots[placement];
  const insRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!slot || !insRef.current) return;
    try {
      const adElement = insRef.current as HTMLElement & { dataset: DOMStringMap };
      if (adElement.dataset.adRequested === "true") return;
      const ads = (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle;
      if (ads) {
        ads.push({});
        adElement.dataset.adRequested = "true";
      }
    } catch {
      // Ad blockers, privacy settings, or a delayed script can prevent an ad request.
    }
  }, [slot]);

  // Do not render empty manual ad units. Auto ads can still be enabled in AdSense.
  if (!slot) return null;
  return <div className="ad-slot" aria-label={label} style={{ minHeight: 90, textAlign: "center", margin: "24px 0" }}>
    <ins ref={(node) => { insRef.current = node; }} className="adsbygoogle" style={{ display: "block" }} data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
  </div>;
}
