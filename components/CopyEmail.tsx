"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — mailto link below still works.
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xl font-bold text-[var(--ink)] sm:text-2xl">{email}</span>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex items-center gap-2 rounded-full bg-[var(--teal-600)] px-5 py-2.5 text-sm font-bold text-white transition-brand hover:bg-[var(--teal-700)]"
      >
        {copied ? "Copied!" : "Copy Email"}
      </button>
    </div>
  );
}
