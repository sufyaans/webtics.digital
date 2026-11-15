import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/motion/MotionProvider";
import Cursor from "@/components/motion/CursorLabel";
import Loader from "@/components/Loader";
import { JsonLd } from "@/components/Blocks";
import { site } from "@/lib/site";
import { services } from "@/content/services";

const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const urbanist = Urbanist({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-urbanist", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Web Design for Small Businesses UK | Webtics Digital", template: "%s" },
  description: site.positioning,
  applicationName: site.name,
  openGraph: { type: "website", locale: "en_GB", siteName: site.name },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#FAF8F4", width: "device-width", initialScale: 1 };

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": site.url + "/#org",
  name: site.name,
  url: site.url,
  logo: site.url + "/icon.svg",
  slogan: site.tagline,
  description: site.positioning,
  areaServed: { "@type": "Country", name: "United Kingdom" },
  address: { "@type": "PostalAddress", addressLocality: "Leicester", addressCountry: "GB" },
  founder: { "@type": "Person", name: "Sufyaan Seedat", jobTitle: "Founder and data engineer" },
  knowsAbout: services.map((s) => s.name),
  email: site.email,
  telephone: "+447927772573",
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${inter.variable} ${urbanist.variable}`} suppressHydrationWarning>
      <head>
        {/* Before first paint: (1) hide scroll-reveal elements only if JS motion will run, un-hiding if it fails to start;
            (2) show the opening curtain on the first visit of a session, with a 6s failsafe */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js');setTimeout(function(){if(!window.__motion)d.classList.remove('js')},3500);var seen=false;try{seen=!!sessionStorage.getItem('webtics-intro')}catch(e){}if(!seen){d.dataset.loader='on';setTimeout(function(){if(d.dataset.loader){delete d.dataset.loader;d.classList.add('intro-go')}},6000)}setTimeout(function(){d.classList.add('settled')},7000)}})();`,
          }}
        />
      </head>
      <body>
        <Loader />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionProvider />
        <Cursor />
        <JsonLd data={orgSchema} />
      </body>
    </html>
  );
}
