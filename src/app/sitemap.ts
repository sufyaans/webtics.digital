import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { getCaseStudies, getPosts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => site.url + p;
  const now = new Date("2026-11-14"); // update on each release
  return [
    { url: u("/"), lastModified: now, priority: 1 },
    { url: u("/services"), lastModified: now, priority: 0.9 },
    ...services.map((s) => ({ url: u(`/services/${s.slug}`), lastModified: now, priority: 0.9 })),
    { url: u("/pricing"), lastModified: now, priority: 0.8 },
    { url: u("/work"), lastModified: now, priority: 0.7 },
    ...getCaseStudies().map((c) => ({ url: u(`/work/${c.slug}`), lastModified: now, priority: 0.6 })),
    { url: u("/blog"), lastModified: now, priority: 0.7 },
    ...getPosts().map((p) => ({ url: u(`/blog/${p.slug}`), lastModified: new Date(p.updated ?? p.date), priority: 0.6 })),
    { url: u("/about"), lastModified: now, priority: 0.6 },
    { url: u("/contact"), lastModified: now, priority: 0.8 },
  ];
}
