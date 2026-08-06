/**
 * Stand-in for real FCC event/congregation photography.
 * Swap for an <Image src="/images/..."> once real photos are added to /public/images.
 */
export function PhotoPlaceholder({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[var(--navy)] via-[var(--teal-start)] to-[var(--teal-end)] ${className}`}
    >
      <div className="absolute inset-0 opacity-20 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,#fff,transparent_35%),radial-gradient(circle_at_80%_70%,#fff,transparent_30%)]" />
      {label && (
        <span className="absolute bottom-3 right-3 rounded-full bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80">
          {label}
        </span>
      )}
    </div>
  );
}
