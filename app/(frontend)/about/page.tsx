import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getAbout } from "@/lib/cms";

export const metadata: Metadata = { title: "About — Favourite Child Church" };

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="kicker">Our story</span>
      <h1 className="mt-3 text-4xl font-bold text-[var(--ink)] sm:text-5xl">
        {about.heading || "About Us"}
      </h1>

      {about.photo && (
        <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
          <Image src={about.photo} alt={about.heading || "About us"} fill className="object-cover" />
        </div>
      )}

      {about.body ? (
        <RichText
          data={about.body}
          className="mt-10 text-[var(--ink)] [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-[var(--ink-soft)] [&_a]:text-[var(--teal-700)] [&_a]:font-semibold [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1"
        />
      ) : (
        <p className="mt-10 text-[var(--ink-soft)]">
          Content coming soon — add it from{" "}
          <Link href="/admin/globals/about" className="font-semibold text-[var(--teal-700)]">
            the CMS
          </Link>
          .
        </p>
      )}
    </div>
  );
}
