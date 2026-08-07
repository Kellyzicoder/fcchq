import { Button } from "@/components/Button";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { Carousel } from "@/components/Carousel";
import { HeroVideo } from "@/components/HeroVideo";
import { schedule, site } from "@/lib/site-data";
import { getLatestVideos } from "@/lib/youtube";
import { SermonCard } from "@/components/SermonCard";

export default async function HomePage() {
  const videos = await getLatestVideos(3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        <HeroVideo />
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
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="accent" href="#visit">
              Plan Your Visit
            </Button>
            <Button variant="outlineLight" href={site.youtubeUrl}>
              Watch Live
            </Button>
          </div>
        </div>
      </section>

      {/* Plan your visit / address + map */}
      <section id="visit" className="mx-auto max-w-6xl px-6 py-20">
        <span className="kicker">We&apos;d love to see you</span>
        <h2 className="mt-3 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
          Plan Your Visit
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] bg-white p-8 hairline shadow-[var(--shadow-sm)]">
            <h3 className="text-lg font-bold text-[var(--ink)]">Address</h3>
            <p className="mt-2 text-[var(--ink-soft)]">{site.address}</p>
            <h3 className="mt-6 text-lg font-bold text-[var(--ink)]">Sunday Service</h3>
            <p className="mt-2 text-[var(--ink-soft)]">10:00 AM</p>
            <Button
              variant="primary"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                site.address
              )}`}
              className="mt-6"
            >
              Get Directions
            </Button>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-lg)] hairline shadow-[var(--shadow-sm)]">
            <iframe
              title="Map to Favourite Child Church"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                site.address
              )}&output=embed`}
              className="h-full min-h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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

        <div className="mt-10 -mx-6 px-6">
          <Carousel>
            {schedule.map((item) => (
              <div key={item.name} className="w-[340px] shrink-0 snap-start sm:w-[400px]">
                <AnnouncementCard
                  name={item.name}
                  image={item.image}
                  detail={item.detail}
                  link={item.link}
                />
              </div>
            ))}
          </Carousel>
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
    </>
  );
}
