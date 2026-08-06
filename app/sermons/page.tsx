import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { SermonCard } from "@/components/SermonCard";
import { getLatestVideos } from "@/lib/youtube";
import { site, podcastPromoImage, dagResources } from "@/lib/site-data";

export const metadata: Metadata = { title: "Sermons — Favourite Child Church" };

export default async function SermonsPage() {
  const videos = await getLatestVideos(12);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="kicker">Media library</span>
      <h1 className="mt-3 text-4xl font-bold text-[var(--ink)] sm:text-5xl">
        Sermons
      </h1>
      <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
        Every message, streamed live and archived on our YouTube channel. For
        the latest audio messages, listen on the DAG Podcast.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Button variant="primary" href={site.youtubeUrl}>
          Watch on YouTube
        </Button>
        <Button variant="outline" href={site.applePodcastUrl}>
          Listen to DAG Podcast
        </Button>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.length > 0 ? (
          videos.map((video) => <SermonCard key={video.id} video={video} />)
        ) : (
          <p className="text-[var(--ink-soft)]">
            Messages are streaming on our{" "}
            <a href={site.youtubeUrl} className="font-semibold text-[var(--teal-700)]">
              YouTube channel
            </a>
            .
          </p>
        )}
      </div>

      <a
        href={site.applePodcastUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 block overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] transition-brand hover:shadow-[var(--shadow-md)]"
      >
        <div className="relative aspect-[16/6] w-full">
          <Image
            src={podcastPromoImage}
            alt="Have you checked out the newest sermon? Search up Dag Heward-Mills on any podcast"
            fill
            className="object-cover"
          />
        </div>
      </a>

      <h2 className="mt-16 text-2xl font-bold text-[var(--ink)]">
        More from Dag Heward-Mills
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dagResources.map((resource) => (
          <a
            key={resource.name}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-[var(--radius-md)] bg-white px-5 py-4 text-sm font-semibold text-[var(--ink)] hairline shadow-[var(--shadow-sm)] transition-brand hover:text-[var(--teal-700)] hover:shadow-[var(--shadow-md)]"
          >
            {resource.name}
            <span aria-hidden className="text-[var(--ink-soft)]">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
