import { site } from "@/lib/site";

/**
 * Social links as round icon buttons: Scarlet by default, turning Egyptian Blue on hover.
 * On dark sections the hover state also gains a pale ring, so the button stays visible
 * against the navy background. Each link has a spoken label for screen readers.
 */
const icons: Record<string, React.ReactNode> = {
  WhatsApp: (
    <>
      <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9.4 7.9c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.1.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3l-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.5-1.4-1.8-.2-.3 0-.4.1-.5l.4-.5.3-.4c.1-.2 0-.3 0-.5z" fill="currentColor" />
    </>
  ),
  Instagram: (
    <>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
    </>
  ),
  TikTok: (
    <path
      d="M13.4 3h2.7c.2 1.9 1.5 3.4 3.4 3.7v2.8c-1.3 0-2.5-.4-3.4-1v6.1a5.2 5.2 0 1 1-5.2-5.2c.3 0 .6 0 .8.1v2.8a2.4 2.4 0 1 0 1.7 2.3z"
      fill="currentColor"
    />
  ),
  LinkedIn: (
    <>
      <circle cx="6.4" cy="6.3" r="1.75" fill="currentColor" />
      <rect x="4.9" y="9.4" width="3" height="9.6" fill="currentColor" />
      <path d="M10.3 9.4h2.9v1.3c.5-.9 1.6-1.6 3.1-1.6 2.6 0 3.5 1.7 3.5 4.3V19h-3v-5c0-1.2-.4-2-1.5-2s-2 .8-2 2.2V19h-3z" fill="currentColor" />
    </>
  ),
};

export default function SocialIcons({ className = "" }: { className?: string }) {
  const links = [{ label: "WhatsApp", href: site.whatsapp }, ...site.socials];
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {links.map((s) => (
        <li key={s.label}>
          <a href={s.href} target="_blank" rel="me noopener" aria-label={`Webtics Digital on ${s.label}`} title={s.label} className="social-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              {icons[s.label]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
