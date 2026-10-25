import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Contact SmartGuideDaily with feedback, corrections, or useful topic suggestions.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return <div className="container prose-page"><div className="kicker">Get in touch</div><h1>Contact SmartGuideDaily</h1><p>Have a question, found an error, or want to suggest a useful topic? Share the details below. For corrections, include the article title or URL and describe what should be checked.</p>
    {email ? <p>Contact email: <a href={`mailto:${email}`}>{email}</a></p> : <p className="small-muted">The message helper below can prepare a message for you. The site owner should configure a monitored contact email in the deployment settings to enable direct email links.</p>}
    <ContactForm email={email || ""}/><h2>What to include</h2><p>For article feedback, include the page URL and a reliable source where possible. For tool issues, mention the tool name, what you entered, and what result you expected. Please do not send passwords, one-time codes, payment details, or other sensitive personal information.</p>
  </div>;
}
