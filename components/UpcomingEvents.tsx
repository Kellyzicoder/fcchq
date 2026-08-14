import Link from "next/link";
import { Carousel } from "./Carousel";
import { UpcomingEventCard } from "./UpcomingEventCard";
import { getUpcomingEvents } from "@/lib/cms";

export async function UpcomingEvents() {
  const events = await getUpcomingEvents(8);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="kicker">Mark your calendar</span>
          <h2 className="mt-3 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
            Upcoming Events
          </h2>
        </div>
        <Link
          href="/events"
          className="text-sm font-bold text-[var(--teal-700)] transition-brand hover:text-[var(--teal-600)]"
        >
          See all
        </Link>
      </div>

      {events.length > 0 ? (
        <div className="mt-10 -mx-6 px-6">
          <Carousel>
            {events.map((event) => (
              <div key={event.name} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
                <UpcomingEventCard event={event} />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <p className="mt-10 text-[var(--ink-soft)]">
          Nothing on the calendar yet — check back soon, or add one from the{" "}
          <Link href="/admin/collections/upcoming-events" className="font-semibold text-[var(--teal-700)]">
            admin panel
          </Link>
          .
        </p>
      )}
    </section>
  );
}
