import LegalPage from "@/components/LegalPage";
import { Ph } from "@/components/Placeholder";

export const metadata = {
  title: "Privacy Policy | Webtics Digital",
  description: "How Webtics Digital collects, uses and protects your personal data under UK GDPR.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy" updated="14 November 2026">
      <p>This policy explains how Webtics Digital (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and uses personal data when you use this website or contact us. We are the data controller. Webtics Digital is run by Sufyaan Seedat, based in Leicester, UK.</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Enquiries:</strong> your name, email address, website address and anything you write in our contact or audit form.</li>
        <li><strong>Analytics (only with your consent):</strong> anonymised information about how you use the site, collected by Google Analytics 4.</li>
        <li><strong>Technical data:</strong> standard server logs such as IP address and browser type, kept briefly for security.</li>
        <li><strong>Spam protection:</strong> our contact form uses Cloudflare Turnstile to tell people from bots. Cloudflare receives your IP address and some browser details for that check only. It does not use advertising cookies.</li>
      </ul>
      <h2>Why we use it</h2>
      <ul>
        <li>To reply to your enquiry and provide the audit or service you asked for (legitimate interests, or steps before entering a contract).</li>
        <li>To understand and improve how the website performs (consent).</li>
        <li>To keep the website secure and prevent spam (legitimate interests).</li>
      </ul>
      <h2>Who we share it with</h2>
      <p>We use a small number of trusted processors: our hosting provider, our email delivery provider, Cloudflare (form spam protection), Cal.com (call bookings) and, if you consent, Google Analytics. <Ph>[CONFIRM PROVIDERS: e.g. Vercel or Netlify, Resend, Google]</Ph> We never sell your data.</p>
      <h2>How long we keep it</h2>
      <p>Enquiries are kept for up to two years unless you become a client, in which case we keep records for as long as needed for the contract and legal obligations. <Ph>[RETENTION PERIOD TO CONFIRM]</Ph></p>
      <h2>Your rights</h2>
      <p>You can ask to see, correct or delete your data, object to how we use it or withdraw consent at any time. Contact us at <a href="mailto:hello@webtics.digital">hello@webtics.digital</a>. You can also complain to the Information Commissioner&apos;s Office (ico.org.uk).</p>
      <h2>Cookies</h2>
      <p>See our <a href="/cookies">cookie policy</a>.</p>
    </LegalPage>
  );
}
