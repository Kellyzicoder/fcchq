import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { SermonsFeed } from "@/components/SermonsFeed";
import { getPinnedSermons, getResources, getSiteSettings } from "@/lib/cms";

export const metadata: Metadata = { title: "Sermons — Favourite Child Church" };

export default async function SermonsPage() {
  const settings = await getSiteSettings();
  const dagResources = await getResources();
  const pinnedFcc = await getPinnedSermons("fcc");
  const pinnedDag = await getPinnedSermons("dag");

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
        {settings.youtubeUrl && (
          <Button variant="primary" href={settings.youtubeUrl}>
            Watch on YouTube
          </Button>
        )}
        {settings.applePodcastUrl && (
          <Button variant="outline" href={settings.applePodcastUrl}>
            Listen to DAG Podcast
          </Button>
        )}
      </div>

      <div className="mt-12">
        <SermonsFeed
          channelId={settings.youtubeChannelId}
          limit={12}
          pinned={pinnedFcc}
          channelUrl={settings.youtubeUrl}
        />
      </div>

      {settings.applePodcastUrl && (
        <a
          href={settings.applePodcastUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 block overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] transition-brand hover:shadow-[var(--shadow-md)]"
        >
          <div className="relative aspect-[16/6] w-full">
            <Image
              src="/images/announcements/podcast.jpg"
              alt="Have you checked out the newest sermon? Search up Dag Heward-Mills on any podcast"
              fill
              className="object-cover"
            />
          </div>
        </a>
      )}

      <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="kicker">From our founder</span>
          <h2 className="mt-3 text-2xl font-bold text-[var(--ink)]">
            Bishop Dag Heward-Mills — Recent Sermons
          </h2>
        </div>
        {settings.dagHewardMillsChannelUrl && (
          <Button variant="outline" href={settings.dagHewardMillsChannelUrl}>
            Visit His Channel
          </Button>
        )}
      </div>
      <div className="mt-6">
        <SermonsFeed
          channelId={settings.dagHewardMillsChannelId}
          limit={10}
          pinned={pinnedDag}
          channelUrl={settings.dagHewardMillsChannelUrl}
        />
      </div>

      <h2 className="mt-16 text-2xl font-bold text-[var(--ink)]">
        More Dag Heward-Mills Resources
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
