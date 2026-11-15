import Link from "next/link";
import { Arrow } from "@/components/Blocks";
import { Emblem } from "@/components/Logo";

export const metadata = { title: "Page not found | Webtics Digital", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative z-10 flex min-h-[80vh] items-center pb-20 pt-36">
      <div className="wrap grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow text-scarlet-deep">Error 404</p>
          <h1 className="display-l mt-6">This thread has come loose.</h1>
          <p className="lede mt-6 max-w-lg text-ink/80">The page you were looking for has moved or never existed. These are a good place to pick it back up.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">Back to home <Arrow /></Link>
            <Link href="/services" className="btn btn-ghost">Services</Link>
            <Link href="/blog" className="btn btn-ghost">Journal</Link>
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9" aria-hidden="true">
          <Emblem className="h-auto w-full max-w-sm rotate-12" />
        </div>
      </div>
    </section>
  );
}
