/**
 * Packages and prices for every service.
 *
 * DRAFT PRICES: everything here was proposed as a starting point, except the £10 a month
 * hosting package, which is Webtics' real price. Edit the numbers freely; the service pages
 * and the /pricing page both read from this file.
 */
export type Package = {
  name: string;
  /** Number only, in pounds */
  price: number;
  /** Shown after the price */
  unit: "one-off" | "per month" | "per project";
  /** Shows "from" before the price */
  from?: boolean;
  blurb: string;
  features: string[];
  /** Highlights the package most people should pick */
  popular?: boolean;
};

export const packages: Record<string, Package[]> = {
  "web-design": [
    {
      name: "Starter",
      price: 795,
      unit: "one-off",
      blurb: "A sharp, fast site for a new or small business.",
      features: ["Up to 5 pages", "Custom design, mobile-first", "Contact form with spam protection", "SEO basics and Google Search Console", "Enquiry tracking set up"],
    },
    {
      name: "Growth",
      price: 1495,
      unit: "one-off",
      popular: true,
      blurb: "For businesses that want the website to bring in work.",
      features: ["Up to 10 pages", "Everything in Starter", "Keyword research and a page plan", "Blog or case studies you can update", "Copywriting support", "Redirects from your old site"],
    },
    {
      name: "Bespoke",
      price: 2950,
      unit: "one-off",
      from: true,
      blurb: "Larger sites, booking, portals or anything out of the ordinary.",
      features: ["Unlimited pages", "Everything in Growth", "Booking, payments or member areas", "Integrations with your tools", "Custom dashboard for enquiries"],
    },
  ],
  seo: [
    {
      name: "Audit and Fix",
      price: 395,
      unit: "one-off",
      blurb: "Find out what is holding you back, and get it fixed.",
      features: ["Full technical audit", "Speed, indexing and structure fixes", "Titles and descriptions rewritten", "A plain-English action list"],
    },
    {
      name: "Local SEO",
      price: 295,
      unit: "per month",
      popular: true,
      blurb: "Steady work to be found by customers near you.",
      features: ["Everything in Audit and Fix", "Keyword and page plan", "2 pages improved or written each month", "Google Business Profile support", "Monthly one-page report"],
    },
    {
      name: "Growth SEO",
      price: 545,
      unit: "per month",
      blurb: "For competitive searches and UK-wide reach.",
      features: ["Everything in Local SEO", "4 articles or pages each month", "Competitor tracking", "Live rankings and enquiries dashboard", "Quarterly strategy call"],
    },
  ],
  "website-care-plans": [
    {
      name: "Hosting",
      price: 10,
      unit: "per month",
      blurb: "Everything a website needs to be online.",
      features: ["Domain registration", "Fast, secure website hosting", "3 IMAP business email accounts", "Free SSL certificate"],
    },
    {
      name: "Care",
      price: 39,
      unit: "per month",
      popular: true,
      blurb: "Hosting, plus someone keeping an eye on it.",
      features: ["Everything in Hosting", "Uptime, speed and form monitoring", "Daily backups", "1 hour of content updates a month", "Monthly health report"],
    },
    {
      name: "Care Plus",
      price: 89,
      unit: "per month",
      blurb: "For sites that bring in leads and change often.",
      features: ["Everything in Care", "3 hours of updates a month", "Priority same-day support", "Monthly SEO and tracking check", "Quarterly review call"],
    },
  ],
  "data-dashboards": [
    {
      name: "Starter Dashboard",
      price: 695,
      unit: "one-off",
      blurb: "One clear view of the numbers you check most.",
      features: ["1 data source", "1 dashboard page", "Up to 6 key figures", "Automatic refresh", "30-minute walkthrough"],
    },
    {
      name: "Business Dashboard",
      price: 1650,
      unit: "one-off",
      popular: true,
      blurb: "Sales, website and operations in one place.",
      features: ["Up to 4 data sources", "3 dashboard pages", "Data cleaned and modelled properly", "Scheduled refresh", "Team training session"],
    },
    {
      name: "Managed Reporting",
      price: 195,
      unit: "per month",
      from: true,
      blurb: "We keep your dashboards accurate and growing.",
      features: ["Monitoring and fixes", "New measures and pages as you need them", "Monthly insights summary", "Priority support"],
    },
  ],
  "automation-chatbots": [
    {
      name: "Single Automation",
      price: 345,
      unit: "one-off",
      blurb: "One repetitive job, taken off your plate.",
      features: ["1 workflow automated", "Connects up to 2 tools", "Failure alerts", "Tested with real scenarios"],
    },
    {
      name: "WhatsApp Assistant",
      price: 895,
      unit: "one-off",
      popular: true,
      blurb: "Answers, bookings and lead capture on WhatsApp.",
      features: ["Up to 15 common questions answered", "Booking or enquiry capture", "Hand-over to a person", "Conversation log", "Running costs estimated upfront"],
    },
    {
      name: "Custom Automation",
      price: 1750,
      unit: "per project",
      from: true,
      blurb: "Several systems, joined up properly.",
      features: ["Process mapping workshop", "Multiple connected workflows", "CRM, email and accounting links", "Monitoring dashboard", "Staff training"],
    },
  ],
  "app-development": [
    {
      name: "Discovery and Prototype",
      price: 950,
      unit: "one-off",
      blurb: "Prove the idea before you pay to build it.",
      features: ["Scoping workshop", "User journeys", "Clickable prototype", "Fixed quote for the build"],
    },
    {
      name: "First Version",
      price: 4500,
      unit: "per project",
      from: true,
      popular: true,
      blurb: "A working app with the features that matter most.",
      features: ["Web app for phone and desktop", "Secure sign-in and roles", "Core features agreed at discovery", "Hosting set-up and launch", "30 days of support"],
    },
    {
      name: "Ongoing Development",
      price: 750,
      unit: "per month",
      from: true,
      blurb: "Keep improving once people are using it.",
      features: ["Agreed days each month", "New features and fixes", "Monitoring and updates", "Monthly progress call"],
    },
  ],
};

export const formatPrice = (p: Package) => `${p.from ? "from " : ""}£${p.price.toLocaleString("en-GB")}`;

export const unitLabel: Record<Package["unit"], string> = {
  "one-off": "one-off",
  "per month": "a month",
  "per project": "per project",
};
