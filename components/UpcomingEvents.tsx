import Link from "next/link";
import { Carousel } from "./Carousel";
import { UpcomingEventCard } from "./UpcomingEventCard";
import { getUpcomingEvents } from "@/lib/cms";

export async function UpcomingEvents({
  limit = 8,
  showHeader = true,
  showSeeAll = true,
  bare = false,
}: {
  limit?: number;
  showHeader?: boolean;
  showSeeAll?: boolean;
  /** Skip the outer section wrapper (max-width, padding) — use when the parent page already provides one. */
  bare?: boolean;
} = {}) {
  const events = await getUpcomingEvents(limit);
  const topSpacing = showHeader ? "mt-10" : "mt-6";

  const content = (
    <>
      {showHeader && (
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="kicker">Mark your calendar</span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
              Upcoming Events
            </h2>
          </div>
          {showSeeAll && (
            <Link
              href="/events"
              className="text-sm font-bold text-[var(--teal-700)] transition-brand hover:text-[var(--teal-600)]"
            >
              See all
            </Link>
          )}
        </div>
      )}

      {events.length > 0 ? (
        <div className={`${topSpacing} -mx-6 px-6`}>
          <Carousel>
            {events.map((event) => (
              <div key={event.name} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
                <UpcomingEventCard event={event} />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <p className={`${topSpacing} text-[var(--ink-soft)]`}>
          Nothing on the calendar yet — check back soon, or add one from the{" "}
          <Link href="/admin/collections/upcoming-events" className="font-semibold text-[var(--teal-700)]">
            admin panel
          </Link>
          .
        </p>
      )}
    </>
  );

  if (bare) return content;

  return <section className="mx-auto max-w-6xl px-6 py-20">{content}</section>;
}
