import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Cookie Policy | Webtics Digital",
  description: "Which cookies the Webtics Digital website uses and how to control them.",
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return (
    <LegalPage title="Cookie policy" updated="14 November 2026">
      <p>This website uses as few cookies as possible.</p>
      <h2>Strictly necessary</h2>
      <p>None are currently set. If we add any (for example, to remember your cookie choice), they will be listed here.</p>
      <h2>Analytics (optional)</h2>
      <p>If you accept analytics, Google Analytics 4 sets cookies such as <code>_ga</code> to measure visits in aggregate. These are only set after you give consent, in line with UK GDPR and PECR, and you can change your mind at any time.</p>
      <p>A consent banner will be added alongside analytics before launch.</p>
    </LegalPage>
  );
}
