type Tone = "gold" | "teal" | "dark";

const toneClasses: Record<Tone, string> = {
  gold: "bg-[var(--gold)]/15 text-[var(--gold)]",
  teal: "bg-[var(--teal-start)]/15 text-[var(--teal-700)]",
  dark: "bg-[var(--navy)]/10 text-[var(--navy)]",
};

export function Badge({
  children,
  tone = "gold",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
