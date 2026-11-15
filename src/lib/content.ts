import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "src", "content");

export type Heading = { id: string; text: string; level: 2 | 3 };

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[`*_[\]()]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function headingsOf(body: string): Heading[] {
  const out: Heading[] = [];
  let inCode = false;
  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const m = /^(##|###)\s+(.+)$/.exec(line);
    if (m) out.push({ level: m[1].length as 2 | 3, text: m[2].trim(), id: slugify(m[2]) });
  }
  return out;
}

function readingTime(body: string) {
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function readDir<T>(dir: string) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        body: content,
        headings: headingsOf(content),
        readingTime: readingTime(content),
        ...(data as T),
      };
    });
}

/* ---------------- Blog ---------------- */
export type PostMeta = {
  title: string;
  description: string;
  category: string;
  date: string;
  updated?: string;
  author: string;
  featured?: boolean;
  draft?: boolean;
  takeaways?: string[];
  services?: string[];
};
export type Post = PostMeta & { slug: string; body: string; headings: Heading[]; readingTime: number };

export function getPosts(): Post[] {
  return readDir<PostMeta>("blog")
    .filter((p) => !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);
export const postCategories = () => [...new Set(getPosts().map((p) => p.category))];

/* ---------------- Case studies ---------------- */
export type CaseMeta = {
  title: string;
  client: string;
  sector: string;
  services: string[];
  summary: string;
  result: string;
  tools: string[];
  year: string;
  order: number;
  url?: string;
  /** Base name of screenshots in public/work: <shots>-desktop.jpg, -mobile.jpg and -page.jpg */
  shots?: string;
  accent?: "ink" | "stone" | "scarlet";
  testimonial?: { quote: string; name: string; role: string };
  draft?: boolean;
};
export type CaseStudy = CaseMeta & { slug: string; body: string; headings: Heading[]; readingTime: number };

export function getCaseStudies(): CaseStudy[] {
  return readDir<CaseMeta>("work")
    .filter((c) => !c.draft)
    .sort((a, b) => a.order - b.order);
}
export const getCaseStudy = (slug: string) => getCaseStudies().find((c) => c.slug === slug);

/** Screenshot paths for a case study, or undefined if none were supplied. */
export const shotsOf = (c: { shots?: string }) =>
  c.shots
    ? { desktop: `/work/${c.shots}-desktop.jpg`, mobile: `/work/${c.shots}-mobile.jpg`, full: `/work/${c.shots}-page.jpg` }
    : undefined;

export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
