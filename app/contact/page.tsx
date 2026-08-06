import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
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
        Have a question, a prayer request, or want to get connected? Send us
        a message and we&apos;ll get back to you.
      </p>

      <div className="mt-10 rounded-[var(--radius-lg)] bg-white p-6 hairline shadow-[var(--shadow-sm)] sm:p-8">
        <ContactForm />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="kicker mb-2">Email</h2>
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-sm font-semibold text-[var(--teal-700)]"
          >
            {site.contactEmail}
          </a>
        </div>
        <div>
          <h2 className="kicker mb-2">Address</h2>
          <p className="text-sm text-[var(--ink-soft)]">{site.address}</p>
        </div>
      </div>
    </div>
  );
}
