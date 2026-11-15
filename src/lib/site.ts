/**
 * Site-wide settings. Anything wrapped in [SQUARE BRACKETS] is a placeholder
 * Sufyaan still needs to confirm. Search the codebase for "[" + "TO CONFIRM" to find them all.
 */
export const site = {
  name: "Webtics Digital",
  url: "https://webtics.digital",
  tagline: "Built to be found. Wired to the numbers.",
  positioning:
    "Websites for small businesses, built by a data engineer. So you can see what is working, not just hope it is.",
  locale: "en-GB",
  city: "Leicester",
  email: "hello@webtics.digital",
  phone: "+44 7927 772573",
  phoneHref: "tel:+447927772573",
  whatsapp: "https://wa.me/447927772573",
  googleReviews: "https://share.google/3AbknXA1KKlVYi8Tb",
  bookingUrl: "/contact#book",
  calLink: "webtics.digital/intro-call", // Cal.com event shown on the contact page
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/webtics-digital/" },
    { label: "Instagram", href: "https://www.instagram.com/webtics.digital/" },
    { label: "TikTok", href: "https://www.tiktok.com/@webtics.digital" },
  ],
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
] as const;

export const isPlaceholder = (v: string) => v.startsWith("[");
