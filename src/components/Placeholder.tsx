/** Renders text, and flags it visually if it is still a [PLACEHOLDER]. */
export default function Placeholder({ value, className = "" }: { value: string; className?: string }) {
  if (value.startsWith("[")) {
    return (
      <span className={`ph ${className}`} title="Placeholder: Sufyaan to confirm">
        {value}
      </span>
    );
  }
  return <span className={className}>{value}</span>;
}

/** Inline helper to mark any text in copy as needing confirmation. */
export function Ph({ children }: { children: React.ReactNode }) {
  return (
    <span className="ph" title="Placeholder: Sufyaan to confirm">
      {children}
    </span>
  );
}
