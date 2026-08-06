import Image from "next/image";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { schedule, site } from "@/lib/site-data";
import { getLatestVideos } from "@/lib/youtube";
import { SermonCard } from "@/components/SermonCard";

export default async function HomePage() {
  const videos = await getLatestVideos(3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Favourite Child Church congregation"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)] via-[var(--navy-deep)]/60 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-40">
          <span className="kicker">Welcome home</span>
          <h1 className="mt-4 max-w-2xl text-5xl font-bold text-white sm:text-6xl md:text-7xl">
            Everything by Prayer
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            Favourite Child Church is a Bible-believing church preaching the
            Gospel of Jesus Christ for the salvation of mankind — raising up
            soul winners who impact their community and country.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="visit">
            <Button variant="accent" href="#rhythm">
              Plan Your Visit
            </Button>
            <Button variant="outlineLight" href={site.youtubeUrl}>
              Watch Live
            </Button>
          </div>
        </div>
      </section>

      {/* Weekly rhythm / service times */}
      <section id="rhythm" className="mx-auto max-w-6xl px-6 py-20">
        <span className="kicker">This week</span>
        <h2 className="mt-3 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
          Our weekly rhythm
        </h2>
        <p className="mt-3 max-w-xl text-[var(--ink-soft)]">
          Join us in person or online — everything at FCC flows from prayer.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schedule.map((item) => (
            <div
              key={item.name}
              className="rounded-[var(--radius-lg)] bg-white p-6 hairline shadow-[var(--shadow-sm)]"
            >
              <Badge tone="teal">{item.time}</Badge>
              <h3 className="mt-4 text-lg font-bold text-[var(--ink)]">
                {item.name}
              </h3>
              {item.detail && (
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{item.detail}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Catch up on the Word */}
      <section className="bg-[var(--paper-alt)] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="kicker">Missed a Sunday?</span>
              <h2 className="mt-3 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
                Catch up on the Word
              </h2>
            </div>
            <Button variant="outline" href={site.youtubeUrl}>
              Browse All Messages
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.length > 0 ? (
              videos.map((video) => <SermonCard key={video.id} video={video} />)
            ) : (
              <p className="text-[var(--ink-soft)]">
                Messages stream live on our{" "}
                <a href={site.youtubeUrl} className="font-semibold text-[var(--teal-700)]">
                  YouTube channel
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Give */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-[var(--radius-lg)] bg-[var(--navy)] px-8 py-14 text-center text-white sm:px-16">
          <span className="kicker">Sow a seed</span>
          <h2 className="mx-auto mt-3 max-w-lg text-3xl font-bold sm:text-4xl">
            Every seed sown helps take the Gospel further
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">2 Corinthians 9:7</p>
          <div className="mt-8">
            <Button variant="accent" href="#visit">
              Give Online
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
