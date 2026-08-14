"use client";

import { useEffect, useState } from "react";
import { Carousel } from "./Carousel";
import { SermonCard } from "./SermonCard";
import type { Video } from "@/lib/youtube";
import type { CmsPinnedSermon } from "@/lib/cms";

function pinnedToVideo(pinned: CmsPinnedSermon): Video {
  return {
    id: pinned.id,
    title: pinned.title,
    url: pinned.url,
    thumbnail: pinned.thumbnail ?? "",
    published: pinned.published ?? "",
  };
}

export function SermonsFeed({
  channelId,
  limit = 10,
  pinned = [],
  channelUrl,
}: {
  channelId?: string | null;
  limit?: number;
  pinned?: CmsPinnedSermon[];
  channelUrl?: string | null;
}) {
  const [fetched, setFetched] = useState<Video[] | null>(channelId ? null : []);

  useEffect(() => {
    if (!channelId) return;
    let cancelled = false;
    fetch(`/api/youtube?channelId=${encodeURIComponent(channelId)}&limit=${limit}`)
      .then((res) => (res.ok ? res.json() : { videos: [] }))
      .then((data: { videos?: Video[] }) => {
        if (!cancelled) setFetched(data.videos ?? []);
      })
      .catch(() => {
        if (!cancelled) setFetched([]);
      });
    return () => {
      cancelled = true;
    };
  }, [channelId, limit]);

  const pinnedVideos = pinned.map(pinnedToVideo);

  if (fetched === null) {
    return (
      <div className="flex gap-6 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-[230px] w-[280px] shrink-0 animate-pulse rounded-[var(--radius-lg)] bg-[var(--paper-alt)] hairline sm:w-[320px]"
          />
        ))}
      </div>
    );
  }

  const pinnedIds = new Set(pinnedVideos.map((v) => v.id));
  const merged = [...pinnedVideos, ...fetched.filter((v) => !pinnedIds.has(v.id))].slice(
    0,
    Math.max(limit, pinnedVideos.length)
  );

  if (merged.length === 0) {
    return (
      <p className="text-[var(--ink-soft)]">
        Messages are streaming on our{" "}
        {channelUrl && (
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--teal-700)]"
          >
            YouTube channel
          </a>
        )}
        .
      </p>
    );
  }

  return (
    <Carousel>
      {merged.map((video) => (
        <div key={video.id} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
          <SermonCard video={video} />
        </div>
      ))}
    </Carousel>
  );
}
