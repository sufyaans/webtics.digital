import type { ReactNode } from "react";
import { PageHero } from "./Blocks";
import HeroArt from "./HeroArt";

export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ label: title }]} eyebrow="Legal" art={<HeroArt name="legal" />} title={title} lede={`Last updated ${updated}. Draft: to be reviewed before launch.`} />
      <section className="relative z-10 pb-28">
        <div className="wrap">
          <article className="prose-w max-w-[44rem]">{children}</article>
        </div>
      </section>
    </>
  );
}
