"use client";

import Link from "next/link";

/** Shown if a page hits an unexpected error, so visitors never get a blank screen. */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="relative z-10 flex min-h-[70vh] items-center pb-20 pt-36">
      <div className="wrap">
        <p className="eyebrow text-scarlet-deep">Something went wrong</p>
        <h1 className="display-l mt-6">That page hit a snag.</h1>
        <p className="lede mt-6 max-w-lg text-ink/80">It is our fault, not yours. Try again, or head back to the home page.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
