import Link from "next/link";
export default function NotFound(){return <section className="section"><div className="container empty-state"><div className="kicker">404 · Page not found</div><h1>We couldn't find that page.</h1><p>It may have moved, or the link may be incorrect.</p><Link className="btn btn-primary" href="/">Back to homepage</Link></div></section>}
