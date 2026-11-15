/**
 * Packages and prices for every service. The service pages and /pricing both read this file.
 *
 * Real prices supplied by Sufyaan: Hosting (£10 a month), Data and dashboards (from £495
 * set-up, then from £125 a month per user). The rest are draft prices awaiting his review.
 *
 * Layout:
 *   - packages with placement "main" (the default) sit side by side
 *   - packages with placement "below" are monthly fees, shown as a separate card underneath
 *     the one-off prices, so it is always clear what is paid once and what is paid monthly
 */
export type Package = {
  name: string;
  /** Number only, in pounds */
  price: number;
  /** Shown after the price */
  unit: "one-off" | "per month" | "per project" | "per user per month";
  /** Shows "from" before the price */
  from?: boolean;
  blurb: string;
  /** One line on who should pick this package */
  bestFor: string;
  features: string[];
  /** Highlights the package most people should pick */
  popular?: boolean;
  /** Offers shown under the price, e.g. instalments or an annual saving */
  extras?: string[];
  /** "below" = a monthly fee shown on its own card underneath the one-off packages */
  placement?: "main" | "below";
  /** Label on a "below" card, e.g. "Monthly fee · required" */
  tag?: string;
};

/** Three months of the Care plan, bundled with every new website */
const CARE_INCLUDED = "First 3 months of Care included (worth £117)";

export const packages: Record<string, Package[]> = {
  "web-design": [
    {
      name: "Starter",
      bestFor: "New businesses and sole traders",
      price: 795,
      unit: "one-off",
      blurb: "A sharp, fast site for a new or small business.",
      extras: ["or 6 monthly payments of £135", CARE_INCLUDED],
      features: ["Up to 5 pages", "Custom design, mobile-first", "Contact form with spam protection", "SEO basics and Google Search Console", "Enquiry tracking set up"],
    },
    {
      name: "Growth",
      bestFor: "Established businesses that want more enquiries",
      price: 1495,
      unit: "one-off",
      popular: true,
      blurb: "For businesses that want the website to bring in work.",
      extras: ["or 6 monthly payments of £255", CARE_INCLUDED],
      features: ["Up to 10 pages", "Everything in Starter", "Keyword research and a page plan", "Blog or case studies you can update", "Copywriting support", "Redirects from your old site"],
    },
    {
      name: "Bespoke",
      bestFor: "Businesses that need bookings, payments or logins",
      price: 2995,
      unit: "one-off",
      from: true,
      blurb: "Larger sites, booking, portals or anything out of the ordinary.",
      extras: ["Payment plan available", CARE_INCLUDED],
      features: ["Unlimited pages", "Everything in Growth", "Booking, payments or member areas", "Integrations with your tools", "Custom dashboard for enquiries"],
    },
  ],
  seo: [
    {
      name: "Audit and Fix",
      bestFor: "Sites that have never had SEO work",
      price: 395,
      unit: "one-off",
      blurb: "Find out what is holding you back, and get it fixed.",
      features: ["Full technical audit", "Speed, indexing and structure fixes", "Titles and descriptions rewritten", "A plain-English action list"],
    },
    {
      name: "Local SEO",
      bestFor: "Businesses that serve a town, city or region",
      price: 295,
      unit: "per month",
      popular: true,
      blurb: "Steady work to be found by customers near you.",
      features: ["Everything in Audit and Fix", "Keyword and page plan", "2 pages improved or written each month", "Google Business Profile support", "Monthly one-page report"],
    },
    {
      name: "Growth SEO",
      bestFor: "Businesses competing across the UK",
      price: 545,
      unit: "per month",
      blurb: "For competitive searches and UK-wide reach.",
      features: ["Everything in Local SEO", "4 articles or pages each month", "Competitor tracking", "Live rankings and enquiries dashboard", "Quarterly strategy call"],
    },
  ],
  "website-care-plans": [
    {
      name: "Hosting",
      bestFor: "Simple sites that rarely change",
      price: 10,
      unit: "per month",
      blurb: "Everything a website needs to be online.",
      extras: ["or £100 a year: 2 months free"],
      features: ["Domain registration", "Fast, secure website hosting", "3 IMAP business email accounts", "Free SSL certificate"],
    },
    {
      name: "Care",
      bestFor: "Businesses that rely on their website for enquiries",
      price: 39,
      unit: "per month",
      popular: true,
      blurb: "Hosting, plus someone keeping an eye on it.",
      extras: ["or £390 a year: 2 months free"],
      features: ["Everything in Hosting", "Uptime, speed and form monitoring", "Daily backups", "1 hour of content updates a month", "Monthly health report"],
    },
    {
      name: "Care Plus",
      bestFor: "Busy sites with regular updates",
      price: 89,
      unit: "per month",
      blurb: "For sites that bring in leads and change often.",
      extras: ["or £890 a year: 2 months free"],
      features: ["Everything in Care", "3 hours of updates a month", "Priority same-day support", "Monthly SEO and tracking check", "Quarterly review call"],
    },
  ],
  "data-dashboards": [
    {
      name: "Dashboard set-up",
      bestFor: "Businesses that want their numbers on one screen",
      price: 495,
      unit: "one-off",
      from: true,
      popular: true,
      blurb: "We connect your data and build your dashboard. Paid once, at the start.",
      features: [
        "Discovery call to agree the questions it must answer",
        "Your data sources connected",
        "Data cleaned and modelled properly",
        "Dashboard designed around your decisions",
        "Automatic refresh set up",
        "Walkthrough for you and your team",
      ],
    },
    {
      name: "Managed reporting",
      bestFor: "Included with every dashboard",
      price: 125,
      unit: "per user per month",
      from: true,
      placement: "below",
      tag: "Monthly fee · part of every dashboard",
      blurb: "Your dashboard is hosted, refreshed and looked after for you. This is what keeps the reports arriving, so it comes with every dashboard.",
      features: ["Dashboard access for each user", "Scheduled data refresh", "Monitoring and fixes if a source breaks", "Changes and new measures as you need them", "Priority support"],
    },
  ],
  "automation-chatbots": [
    {
      name: "Single Automation",
      bestFor: "One task that eats time every week",
      price: 345,
      unit: "one-off",
      blurb: "One repetitive job, taken off your plate.",
      features: ["1 workflow automated", "Connects up to 2 tools", "Failure alerts", "Tested with real scenarios"],
    },
    {
      name: "WhatsApp Assistant",
      bestFor: "Businesses answering the same questions daily",
      price: 895,
      unit: "one-off",
      popular: true,
      blurb: "Answers, bookings and lead capture on WhatsApp.",
      features: ["Up to 15 common questions answered", "Booking or enquiry capture", "Hand-over to a person", "Conversation log", "Running costs estimated upfront"],
    },
    {
      name: "Custom Automation",
      bestFor: "Teams copying data between several systems",
      price: 1795,
      unit: "per project",
      from: true,
      blurb: "Several systems, joined up properly.",
      features: ["Process mapping workshop", "Multiple connected workflows", "CRM, email and accounting links", "Monitoring dashboard", "Staff training"],
    },
  ],
  "app-development": [
    {
      name: "Discovery and Prototype",
      bestFor: "Testing an idea before committing budget",
      price: 995,
      unit: "one-off",
      blurb: "Prove the idea before you pay to build it. Paid once.",
      features: ["Scoping workshop", "User journeys", "Clickable prototype", "Fixed quote for the build"],
    },
    {
      name: "App build",
      bestFor: "Businesses ready to launch a working tool",
      price: 4495,
      unit: "one-off",
      from: true,
      popular: true,
      blurb: "A working app with the features that matter most. Paid once, in stages.",
      extras: ["Payment plan available"],
      features: ["Web app for phone and desktop", "Secure sign-in and roles", "Core features agreed at discovery", "Hosting set-up and launch", "30 days of support"],
    },
    {
      name: "Ongoing development",
      bestFor: "Apps already in use that need to grow",
      price: 795,
      unit: "per month",
      from: true,
      placement: "below",
      tag: "Monthly fee · optional",
      blurb: "Once your app is live, keep it hosted, supported and improving. Only if you want it; you can stop at any time.",
      features: ["Agreed days of work each month", "New features and fixes", "Hosting, monitoring and updates", "Monthly progress call"],
    },
  ],
};

/** A promise shown under a service's packages */
export const guarantees: Record<string, { title: string; body: string }> = {
  "web-design": {
    title: "The first-design guarantee",
    body: "If you are not happy with the first design we show you, you do not pay. No awkward conversation, no invoice.",
  },
};

export const formatPrice = (p: Package) => `${p.from ? "from " : ""}£${p.price.toLocaleString("en-GB")}`;

export const unitLabel: Record<Package["unit"], string> = {
  "one-off": "one-off",
  "per month": "a month",
  "per project": "per project",
  "per user per month": "a month, per user",
};
