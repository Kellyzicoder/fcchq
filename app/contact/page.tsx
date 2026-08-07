import type { Metadata } from "next";
import { CopyEmail } from "@/components/CopyEmail";
import { site } from "@/lib/site-data";

export const metadata: Metadata = { title: "Contact — Favourite Child Church" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="kicker">Get in touch</span>
      <h1 className="mt-3 text-4xl font-bold text-[var(--ink)] sm:text-5xl">
        Contact Us
      </h1>
      <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
        Have a question, a prayer request, or want to get connected? Reach us
        by email — we&apos;d love to hear from you.
      </p>

      <div className="mt-10 rounded-[var(--radius-lg)] bg-white p-8 hairline shadow-[var(--shadow-sm)]">
        <h2 className="kicker mb-3">Email</h2>
        <CopyEmail email={site.contactEmail} />
      </div>

      <div className="mt-10">
        <h2 className="kicker mb-2">Address</h2>
        <p className="text-sm text-[var(--ink-soft)]">{site.address}</p>
      </div>
    </div>
  );
}
