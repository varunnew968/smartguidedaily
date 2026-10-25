export default function AdSlot({ label = "Advertisement" }: { label?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return <div aria-label="Ad placement preview" style={{border:"1px dashed #dbe2ee",borderRadius:12,padding:"13px 16px",textAlign:"center",color:"#94a0b3",fontSize:11,letterSpacing:".8px",background:"#fafbfe"}}>{label} · AD SLOT PREVIEW</div>;
  return <div className="ad-slot" aria-label={label} style={{minHeight:90,textAlign:"center",margin:"20px 0"}}>
    <ins className="adsbygoogle" style={{display:"block"}} data-ad-client={client} data-ad-slot="" data-ad-format="auto" data-full-width-responsive="true" />
  </div>;
}
