import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/content";
import { services } from "@/content/services";
import { FinalCta, PageHero } from "@/components/Blocks";
import WorkIndex from "./WorkIndex";
import HeroArt from "@/components/HeroArt";

export const metadata: Metadata = {
  title: "Case Studies | Small Business Websites and Dashboards | Webtics Digital",
  description:
    "Real projects for UK small businesses: websites, SEO, care plans, dashboards and automation. See the challenge, the approach and the results.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const items = getCaseStudies().map((c) => ({ ...c, body: "", headings: [] }));
  const serviceNames = Object.fromEntries(services.map((s) => [s.slug, s.name]));
  return (
    <>
      <PageHero
        crumbs={[{ label: "Case studies" }]}
        eyebrow="Case studies"
        art={<HeroArt name="work" />}
        title={"The work,\nand what it did."}
        lede="Websites and data projects for small businesses. Each one shows the problem, what we did and the numbers that changed."
      />
      <WorkIndex items={items} serviceNames={serviceNames} />
      <FinalCta title="Could your business be the next case study?" />
    </>
  );
}
