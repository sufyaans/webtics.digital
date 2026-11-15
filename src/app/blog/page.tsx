import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import { FinalCta, PageHero } from "@/components/Blocks";
import BlogIndex from "./BlogIndex";
import HeroArt from "@/components/HeroArt";

export const metadata: Metadata = {
  title: "Journal | Web Design, SEO and Data Advice for Small Businesses | Webtics Digital",
  description:
    "Plain-English guides for UK small businesses on website costs, SEO, care plans and Power BI dashboards. No jargon, no fluff.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPosts().map((p) => ({ ...p, body: "", headings: [], excerpt: p.body.slice(0, 400) }));
  return (
    <>
      <PageHero
        crumbs={[{ label: "Journal" }]}
        eyebrow="The Webtics journal"
        art={<HeroArt name="journal" />}
        title={"Straight answers\nfor small businesses."}
        lede="Practical guides on websites, search and data. Written by the people who do the work."
      />
      <BlogIndex posts={posts} />
      <FinalCta title="Prefer a straight answer about your own website?" />
    </>
  );
}
