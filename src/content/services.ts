export type Service = {
  slug: string;
  no: string;
  name: string;
  short: string;
  side: "front" | "back";
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  h1: string;
  lede: string;
  intro: string[];
  signs: string[];
  included: { title: string; body: string }[];
  process: { title: string; body: string }[];
  tools: string[];
  faqs: { q: string; a: string }[];
  relatedPosts: string[];
  ctaTitle: string;
  /** Hidden services stay in this file but appear nowhere on the site */
  hidden?: boolean;
};

const allServices: Service[] = [
  {
    slug: "web-design",
    no: "01",
    name: "Web design and development",
    short: "Fast, custom websites that turn visitors into enquiries.",
    side: "front",
    metaTitle: "Small Business Website Design UK | Webtics Digital",
    metaDescription:
      "Custom websites for UK small businesses. Designed to rank, built to load fast and wired up so you can see every enquiry. Get a free website audit.",
    primaryKeyword: "small business website design",
    h1: "Websites for small businesses that earn their keep.",
    lede: "A website should bring in work. Ours are designed around one job: turning the right visitors into enquiries, then showing you exactly where they came from.",
    intro: [
      "Most small business websites look fine and do very little. They load slowly, say the same thing as every competitor and give you no idea whether anyone is using them.",
      "We start with what the site needs to achieve, who it is for and what they search for. Then we design and build it from scratch. No themes, no page builders, no plugin pile to patch every month.",
      "Every site we launch has tracking set up from day one. You will know how many people visited, what they did and which pages bring in enquiries.",
    ],
    signs: [
      "You get visitors but hardly any enquiries.",
      "Your site is slow on a phone, or looks dated next to competitors.",
      "You cannot update it without paying someone or breaking something.",
      "You have no idea how many leads the website actually brings in.",
    ],
    included: [
      { title: "Strategy and structure", body: "Keyword research, a page plan and a clear route from landing to enquiry." },
      { title: "Custom design", body: "Designed for your brand and your customers, not adapted from a template." },
      { title: "Fast, secure build", body: "Modern code, strong security headers and no plugins to patch. Built to pass Core Web Vitals." },
      { title: "SEO foundations", body: "Clean URLs, structured data, metadata, sitemaps and redirects from your old site." },
      { title: "Tracking from day one", body: "GA4, Search Console and conversion events for every form and call button." },
      { title: "Easy editing", body: "Update text, posts and case studies yourself through a simple editor." },
    ],
    process: [
      { title: "Audit", body: "We review your current site, rankings and competitors." },
      { title: "Plan", body: "Sitemap, keywords, content plan and a fixed quote." },
      { title: "Design", body: "Homepage and key templates designed for sign-off." },
      { title: "Build", body: "Developed, tested on real devices and checked for speed and accessibility." },
      { title: "Launch and connect", body: "Redirects, tracking and Search Console set up, then a walkthrough." },
    ],
    tools: ["Next.js", "React", "TypeScript", "GA4", "Search Console"],
    faqs: [
      {
        q: "How long does a new website take?",
        a: "Most small business sites take four to eight weeks from kick-off to launch. It depends on the number of pages and how quickly content and feedback come back. [TIMELINE TO CONFIRM]",
      },
      {
        q: "Will I lose my Google rankings if I redesign?",
        a: "Not if it is done carefully. We map every old URL to its new home with permanent redirects, keep the content that ranks and check Search Console after launch.",
      },
      {
        q: "Can I update the website myself?",
        a: "Yes. You get a simple editor for text, blog posts and case studies, plus a short guide. If you would rather not, a care plan covers updates for you.",
      },
      {
        q: "Do you use WordPress?",
        a: "Not by default. We build on a modern stack with no plugins to patch, which is faster and far harder to hack. If you have a strong reason to stay on WordPress, we will talk it through.",
      },
    ],
    relatedPosts: ["how-much-does-a-small-business-website-cost-uk"],
    ctaTitle: "Find out what your current site is costing you.",
  },
  {
    slug: "seo",
    no: "02",
    name: "SEO",
    short: "Get found by the people already searching for you.",
    side: "front",
    metaTitle: "Small Business SEO Services UK | Webtics Digital",
    metaDescription:
      "Plain-spoken SEO for UK small businesses. Technical fixes, content that ranks and monthly reports you can actually read. Start with a free audit.",
    primaryKeyword: "small business SEO services",
    h1: "SEO for small businesses, done properly.",
    lede: "No mystery, no long contracts full of jargon. We fix what is holding your site back, write content people search for and report on the numbers that matter: visits, calls and enquiries.",
    intro: [
      "Good SEO for a small business is mostly unglamorous: a fast, well-structured site, pages that match what people actually search for, and steady, useful content.",
      "Because we also build data pipelines for a living, our reports are clear. You will see which searches bring visitors, which pages turn them into enquiries and what we are doing next.",
    ],
    signs: [
      "Competitors appear above you for the services you offer.",
      "Your traffic has dropped since a redesign or platform change.",
      "You have paid for SEO before and never understood what you got.",
      "Your Google Business Profile is limited or suspended, so your website has to work harder.",
    ],
    included: [
      { title: "Technical audit and fixes", body: "Speed, indexing, structured data, broken links and redirects." },
      { title: "Keyword and intent map", body: "One clear target per page, based on what your customers search for." },
      { title: "On-page optimisation", body: "Titles, descriptions, headings and internal links that earn the click." },
      { title: "Content plan", body: "Articles and service pages that answer real questions, written in your voice." },
      { title: "Local signals", body: "Location pages, consistent business details and schema markup." },
      { title: "Monthly report", body: "A one-page dashboard: rankings, visits, enquiries, and what is next." },
    ],
    process: [
      { title: "Audit", body: "Technical crawl, ranking snapshot and competitor gaps." },
      { title: "Fix", body: "Quick technical wins first, so the rest of the work counts." },
      { title: "Build", body: "Improve key pages and publish content to a plan." },
      { title: "Measure", body: "Track rankings, clicks and enquiries every month." },
    ],
    tools: ["Search Console", "GA4", "Looker Studio", "Power BI", "Screaming Frog"],
    faqs: [
      {
        q: "How long does SEO take to work?",
        a: "Technical fixes can show results within weeks. Competitive rankings usually take three to six months of steady work. Anyone promising page one in a fortnight is guessing.",
      },
      {
        q: "Do you guarantee rankings?",
        a: "No, and nobody honest can. Google decides rankings. What we guarantee is clear work, clear reporting and no wasted spend.",
      },
      {
        q: "Is there a minimum contract?",
        a: "[CONTRACT TERMS TO CONFIRM]",
      },
    ],
    relatedPosts: ["is-your-website-hurting-your-seo"],
    ctaTitle: "See what is holding your rankings back.",
  },
  {
    slug: "website-care-plans",
    no: "03",
    name: "Website care plans",
    short: "Hosting, updates, security and support, handled.",
    side: "back",
    metaTitle: "Website Care Plans UK | Maintenance and Hosting | Webtics Digital",
    metaDescription:
      "Website care plans for UK small businesses: secure hosting, backups, monitoring, content updates and a monthly health report. No surprise bills.",
    primaryKeyword: "website care plan UK",
    h1: "Website care plans. We look after it, you run the business.",
    lede: "Hosting, security, backups, updates and small changes, all for one monthly fee. Plus a short report each month so you can see it is all working.",
    intro: [
      "Most agencies hand over a website and disappear. Then a form breaks, a certificate expires or something gets hacked, and nobody notices for weeks.",
      "A care plan means someone is watching. We monitor uptime, speed and security, keep everything backed up and make the small changes you need without a new quote every time.",
    ],
    signs: [
      "Your site has been hacked or infected before.",
      "Nobody is responsible for updates, backups or renewals.",
      "Small changes take weeks because you have to chase someone.",
      "You do not know whether your contact forms are actually working.",
    ],
    included: [
      { title: "Hosting, domain and email", body: "Fast, secure hosting with your domain registration and three IMAP business email accounts, from £10 a month." },
      { title: "Monitoring", body: "Uptime, speed and form checks, with alerts when something breaks." },
      { title: "Backups", body: "Versioned backups, so any change can be rolled back." },
      { title: "Content updates", body: "Text, images and small page changes, within your plan's hours." },
      { title: "Monthly health report", body: "Visits, enquiries, speed and anything we fixed." },
      { title: "Priority support", body: "A real person to email, not a ticket queue." },
    ],
    process: [
      { title: "Onboard", body: "We take over hosting, domains and access safely." },
      { title: "Harden", body: "Security review, backups and monitoring switched on." },
      { title: "Care", body: "Updates, fixes and changes each month." },
      { title: "Report", body: "A clear monthly summary of what happened." },
    ],
    tools: ["Cloudflare", "Uptime monitoring", "GA4", "Search Console"],
    faqs: [
      {
        q: "Can you look after a website you did not build?",
        a: "Usually, yes. We will review it first and tell you honestly whether care or a rebuild makes more sense.",
      },
      { q: "How much is a care plan?", a: "Hosting, with a domain and three business email accounts, is £10 a month. Care plans that add monitoring, backups and updates start from £39 a month. The packages on this page show what each one includes." },
      {
        q: "What happens if my site gets hacked?",
        a: "Our builds have no database or plugins to exploit, which removes the most common attack routes. If anything does go wrong, we restore from backup and investigate as part of your plan.",
      },
    ],
    relatedPosts: ["website-care-plan-is-it-worth-it"],
    ctaTitle: "Stop worrying about your website.",
  },
  {
    slug: "data-dashboards",
    no: "04",
    name: "Data and dashboards",
    short: "Power BI dashboards that show you how the business is doing.",
    side: "back",
    metaTitle: "Power BI Dashboards for Small Businesses | Webtics Digital",
    metaDescription:
      "Power BI dashboards and reporting for UK small businesses, built by a working data engineer. Bring your sales, website and spreadsheets into one clear view.",
    primaryKeyword: "Power BI dashboards for small business",
    h1: "Power BI dashboards for small businesses.",
    lede: "Your numbers live in spreadsheets, tills, CRMs and Google Analytics. We bring them into one dashboard you can open on a Monday morning and understand in a minute.",
    intro: [
      "This is where Webtics is different. Sufyaan is a working data engineer who builds platforms on Databricks, SQL Server, Power BI and Azure. That same skill is now available to small businesses, at a small business scale.",
      "We connect your data sources, clean them up and build dashboards around the questions you actually ask. Which services make money? Where do enquiries come from? Which month is coming up short?",
    ],
    signs: [
      "Someone spends hours every week copying numbers between spreadsheets.",
      "You find out how last month went weeks after it ended.",
      "Different reports give different answers to the same question.",
      "You cannot tell which marketing actually brings in customers.",
    ],
    included: [
      { title: "Discovery", body: "We agree the five to ten questions the dashboard must answer." },
      { title: "Data connections", body: "Spreadsheets, accounting software, CRMs, tills, GA4 and more." },
      { title: "Data modelling", body: "Clean, reliable tables so every number agrees with every other." },
      { title: "Dashboard design", body: "Clear visuals designed for decisions, not decoration." },
      { title: "Automated refresh", body: "Scheduled updates, so the numbers are current without manual work." },
      { title: "Training", body: "A walkthrough so you and your team can use it confidently." },
    ],
    process: [
      { title: "Questions", body: "What do you need to know, and how often?" },
      { title: "Connect", body: "Map and connect your data sources securely." },
      { title: "Model", body: "Clean and structure the data properly." },
      { title: "Visualise", body: "Build, test and refine the dashboard with you." },
      { title: "Hand over", body: "Train your team and set up refreshes." },
    ],
    tools: ["Power BI", "SQL Server", "Azure", "Databricks", "Excel", "GA4"],
    faqs: [
      {
        q: "How much does a dashboard cost?",
        a: "There are two parts. A one-off set-up fee from £495 covers connecting your data and building the dashboard. Managed reporting, from £125 a month per user, keeps it hosted, refreshed and supported. It is part of every dashboard, because it is what keeps the reports arriving.",
      },
      {
        q: "Do I need a Power BI licence?",
        a: "Usually you need Power BI Pro for each person who views shared dashboards. We will advise on the cheapest set-up for your team before we start.",
      },
      {
        q: "Is my data safe?",
        a: "Yes. We work inside your own Microsoft account wherever possible, use the least access needed and never copy data anywhere it does not need to be.",
      },
      {
        q: "We only use spreadsheets. Is that enough?",
        a: "Yes. Many small business dashboards start from a handful of spreadsheets. We can tidy them up as part of the project.",
      },
    ],
    relatedPosts: ["what-a-power-bi-dashboard-can-do-for-a-small-business"],
    ctaTitle: "See your business on one screen.",
  },
  {
    slug: "automation-chatbots",
    hidden: true, // hidden for now at Sufyaan's request: set to false to bring it back
    no: "05",
    name: "Automation and chatbots",
    short: "WhatsApp bots and automations that take the busywork off you.",
    side: "back",
    metaTitle: "Business Automation and WhatsApp Chatbots UK | Webtics Digital",
    metaDescription:
      "Automation and WhatsApp chatbots for UK small businesses. Answer enquiries, book appointments and move data between your tools without manual work.",
    primaryKeyword: "business automation UK",
    h1: "Automation and chatbots that take the busywork off your plate.",
    lede: "Answer common questions at midnight, book appointments without phone tag and stop copying details from one system to another. We build small, reliable automations that pay for themselves.",
    intro: [
      "Most small businesses lose hours each week to repetitive tasks: replying to the same five questions, re-typing enquiries into a spreadsheet, chasing confirmations.",
      "We map the work, find the repeatable parts and automate them. That could be a WhatsApp assistant, a form that files itself into your CRM, or a weekly report that writes and sends itself.",
    ],
    signs: [
      "You answer the same customer questions every day.",
      "Enquiries arrive in several places and some get missed.",
      "Staff copy information between systems by hand.",
      "Bookings involve several messages back and forth.",
    ],
    included: [
      { title: "Process mapping", body: "We find the tasks worth automating, and the ones that are not." },
      { title: "WhatsApp and web chatbots", body: "Answer FAQs, qualify enquiries and hand over to a human when needed." },
      { title: "Booking flows", body: "Let customers book and get reminders automatically." },
      { title: "System integrations", body: "Connect forms, CRMs, email, spreadsheets and accounting tools." },
      { title: "Notifications", body: "The right alert to the right person when something needs attention." },
      { title: "Monitoring", body: "Logs and alerts so automations never fail silently." },
    ],
    process: [
      { title: "Map", body: "Walk through how the work happens today." },
      { title: "Prioritise", body: "Pick the automations with the best return." },
      { title: "Build", body: "Build, test with real scenarios, refine." },
      { title: "Run", body: "Launch, monitor and improve." },
    ],
    tools: ["WhatsApp Business API", "Power Automate", "Azure", "Webhooks", "APIs"],
    faqs: [
      {
        q: "Will a chatbot annoy my customers?",
        a: "Not if it is built well. Ours answer clear questions quickly and pass anything else to a person straight away.",
      },
      {
        q: "What does WhatsApp automation cost to run?",
        a: "WhatsApp charges per conversation, and costs vary by message type. We estimate running costs upfront so there are no surprises. [PRICING DETAIL TO CONFIRM]",
      },
    ],
    relatedPosts: ["five-things-to-automate-with-whatsapp"],
    ctaTitle: "Find the hours hiding in your week.",
  },
  {
    slug: "app-development",
    no: "06",
    name: "App development",
    short: "Web apps and portals built around how you work.",
    side: "front",
    metaTitle: "App Development for Small Businesses UK | Webtics Digital",
    metaDescription:
      "Custom web apps, client portals and internal tools for UK small businesses. Built fast, secure and simple to use. Book a call to talk it through.",
    primaryKeyword: "small business app development",
    h1: "App development for small businesses.",
    lede: "Booking systems, client portals, quoting tools and internal dashboards. When off-the-shelf software does not fit, we build something that does, without enterprise prices.",
    intro: [
      "Sometimes the right answer is not another subscription. It is a small, focused tool built around exactly how your business works.",
      "We design and build web apps that work on any device, keep your data secure and can grow with you. We start small, ship early and improve from real use.",
    ],
    signs: [
      "You are paying for software where you only use one feature.",
      "Your team works around the tools instead of with them.",
      "Customers keep asking for a portal, an account area or online quotes.",
      "A spreadsheet has quietly become business-critical.",
    ],
    included: [
      { title: "Scoping", body: "A clear brief, user journeys and a fixed first phase." },
      { title: "UX and interface design", body: "Simple screens your team and customers understand straight away." },
      { title: "Development", body: "A modern, typed codebase with tests and documentation." },
      { title: "Accounts and security", body: "Secure sign-in, roles and data protection built in." },
      { title: "Integrations", body: "Payments, email, calendars and your existing tools." },
      { title: "Support", body: "Hosting, monitoring and improvements after launch." },
    ],
    process: [
      { title: "Scope", body: "Agree the smallest version that delivers value." },
      { title: "Design", body: "Clickable prototype for feedback." },
      { title: "Build", body: "Develop in short cycles you can see." },
      { title: "Launch", body: "Go live, train users, then improve." },
    ],
    tools: ["Next.js", "React", "TypeScript", "Azure", "SQL"],
    faqs: [
      {
        q: "Do you build iPhone and Android apps?",
        a: "We focus on web apps that work on every device and can be installed on a phone's home screen. If you need a native app store app, we will tell you honestly and can recommend a partner. [CONFIRM SCOPE]",
      },
      {
        q: "Who owns the code?",
        a: "You do. Once the project is paid for, the code and data are yours.",
      },
    ],
    relatedPosts: [],
    ctaTitle: "Got a process that needs its own tool?",
  },
];

/** The services shown on the site, numbered in order (01, 02, ...) */
export const services: Service[] = allServices.filter((s) => !s.hidden).map((s, i) => ({ ...s, no: String(i + 1).padStart(2, "0") }));

export const getService = (slug: string) => services.find((s) => s.slug === slug);
