"use client";

import { useState } from "react";
import { site } from "@/lib/site-data";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${message}\n\n— ${name} (${email})`;
    const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const inputClass =
    "w-full rounded-[var(--radius-md)] border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition-brand focus:border-[var(--teal-600)]";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
            Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
            Email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
          Subject
        </label>
        <input
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[var(--ink)]">
          Message
        </label>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--teal-600)] px-6 py-3 text-sm font-bold text-white transition-brand hover:bg-[var(--teal-700)]"
      >
        Send Message
      </button>
      <p className="text-xs text-[var(--ink-soft)]">
        This opens your email app with the message ready to send to{" "}
        {site.contactEmail}.
      </p>
    </form>
  );
}
