"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./Button";

const links = [
  { href: "/", label: "Home" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="" width={40} height={40} priority />
          <span className="text-sm font-bold tracking-tight text-[var(--ink)] sm:text-base">
            Favourite Child Church
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[var(--ink)] transition-brand hover:text-[var(--teal-700)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block">
            <Button variant="accent" href="/#visit" className="text-xs sm:text-sm">
              Plan Your Visit
            </Button>
          </span>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full hairline transition-brand hover:bg-[var(--paper-alt)] md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-[var(--ink)]" fill="none" strokeWidth={2}>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-[var(--line)] bg-[var(--paper)] px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-semibold text-[var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="accent" href="/#visit" className="mt-2 justify-center" >
            Plan Your Visit
          </Button>
        </nav>
      )}
    </header>
  );
}
