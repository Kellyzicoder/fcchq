import Link from "next/link";
import { ComponentProps } from "react";

type Variant = "primary" | "accent" | "dark" | "outline" | "outlineLight" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--teal-600)] text-white hover:bg-[var(--teal-700)]",
  accent: "bg-[var(--gold)] text-[var(--ink)] hover:brightness-95",
  dark: "bg-[var(--navy)] text-white hover:bg-[var(--navy-deep)]",
  outline:
    "border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper-alt)] bg-transparent",
  outlineLight:
    "border border-white/40 text-white hover:bg-white/10 bg-transparent",
  ghost: "text-[var(--ink)] hover:bg-[var(--paper-alt)] bg-transparent",
};

type ButtonProps = {
  variant?: Variant;
  href?: string;
  className?: string;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-brand ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
