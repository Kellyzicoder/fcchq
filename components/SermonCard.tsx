import Image from "next/image";
import type { Video } from "@/lib/youtube";

export function SermonCard({ video }: { video: Video }) {
  const date = video.published
    ? new Date(video.published).toLocaleDateString("en-NZ", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-[var(--radius-lg)] bg-white hairline shadow-[var(--shadow-sm)] transition-brand hover:shadow-[var(--shadow-md)]"
    >
      <div className="relative aspect-video overflow-hidden bg-[var(--navy)]">
        {video.thumbnail && (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-[var(--shadow-md)]">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[var(--navy)]">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 text-base font-bold text-[var(--ink)]">
          {video.title}
        </h3>
        {date && <p className="mt-2 text-sm text-[var(--ink-soft)]">{date}</p>}
      </div>
    </a>
  );
}
