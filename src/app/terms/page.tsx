import LegalPage from "@/components/LegalPage";
import { Ph } from "@/components/Placeholder";

export const metadata = {
  title: "Terms | Webtics Digital",
  description: "Terms of use for the Webtics Digital website.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <LegalPage title="Terms of use" updated="14 November 2026">
      <p>These terms cover your use of this website. Project work is covered by a separate written agreement.</p>
      <h2>Content</h2>
      <p>Articles on this site are general guidance, not professional advice for your specific situation. We work to keep them accurate but cannot guarantee they are complete or current.</p>
      <h2>Intellectual property</h2>
      <p>The Webtics Digital name, logo, design and written content belong to us unless stated otherwise. Client work is shown with permission.</p>
      <h2>Liability</h2>
      <p>We are not liable for any loss arising from use of this website, except where the law does not allow us to exclude liability.</p>
      <h2>Law</h2>
      <p>These terms are governed by the laws of England and Wales. <Ph>[TERMS TO BE REVIEWED BEFORE LAUNCH]</Ph></p>
    </LegalPage>
  );
}
