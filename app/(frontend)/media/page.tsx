import type { Metadata } from "next";
import { getVideos } from "@/lib/cms";

export const metadata: Metadata = { title: "Media — Favourite Child Church" };

export default async function MediaPage() {
  const mediaItems = await getVideos();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <span className="kicker">Watch</span>
      <h1 className="mt-3 text-4xl font-bold text-[var(--ink)] sm:text-5xl">
        Media
      </h1>
      <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
        Moments from FCC — baptisms, outreach, and life together as a church.
      </p>

      <div className="mt-12 grid gap-10">
        {mediaItems.map((item) => (
          <div key={item.name}>
            <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--navy)] shadow-[var(--shadow-md)]">
              <video
                src={item.src}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full"
              />
            </div>
            <h2 className="mt-4 text-xl font-bold text-[var(--ink)]">{item.name}</h2>
            {item.description && (
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
