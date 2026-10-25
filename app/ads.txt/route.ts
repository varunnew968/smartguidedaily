const DEFAULT_ADSENSE_CLIENT = "ca-pub-6633143653612883";

export const dynamic = "force-dynamic";

export function GET() {
  const configuredClient = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || DEFAULT_ADSENSE_CLIENT).trim();
  const match = configuredClient.match(/^ca-pub-(\d{16})$/);
  // Fall back to the publisher ID already present in the supplied project if the env value is malformed.
  const publisherId = match?.[1] || "6633143653612883";
  const body = `google.com, pub-${publisherId}, DIRECT, f08c47fec0942fa0\n`;
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
