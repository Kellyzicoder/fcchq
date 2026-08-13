import type { Metadata } from "next";
import { EventCard } from "@/components/EventCard";
import { AnnouncementCard } from "@/components/AnnouncementCard";
import { Carousel } from "@/components/Carousel";
import { getAnnouncements, getEvents } from "@/lib/cms";

export const metadata: Metadata = { title: "Events — Favourite Child Church" };

export default async function EventsPage() {
  const specialEvents = await getEvents();
  const schedule = await getAnnouncements();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <span className="kicker">What&apos;s on</span>
      <h1 className="mt-3 text-4xl font-bold text-[var(--ink)] sm:text-5xl">
        Events
      </h1>
      <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
        Our recurring services and special Sundays throughout the year.
      </p>

      <h2 className="mt-14 text-2xl font-bold text-[var(--ink)]">
        Special Sundays
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {specialEvents.map((event) => (
          <EventCard
            key={event.name}
            name={event.name}
            time={event.date}
            image={event.image}
            link={event.link ?? undefined}
          />
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold text-[var(--ink)]">
        Weekly Rhythm
      </h2>
      <div className="mt-6 -mx-6 px-6">
        <Carousel>
          {schedule.map((item) => (
            <div key={item.name} className="w-[340px] shrink-0 snap-start sm:w-[400px]">
              <AnnouncementCard
                name={item.name}
                image={item.image ?? ""}
                detail={item.detail ?? undefined}
                link={item.link ?? undefined}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
