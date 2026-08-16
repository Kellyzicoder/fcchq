"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { buildIcsContent, slugify } from "@/lib/calendar";

export type UpcomingEvent = {
  name: string;
  category: string;
  date: string;
  startDate: string;
  endDate: string;
  location: string;
  price: string;
  image?: string;
  link?: string | null;
};

function AddToCalendarButton({ event }: { event: UpcomingEvent }) {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  function openInCalendar() {
    const calendarInput = {
      title: event.name,
      start,
      end,
      location: event.location,
      uid: `${slugify(event.name)}-${start.getTime()}@favouritechildchurch`,
    };
    const blob = new Blob([buildIcsContent(calendarInput)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    // No `download` attribute: letting the browser navigate to the blob URL
    // hands .ics content straight to the OS calendar app instead of forcing
    // a file download.
    window.location.href = url;
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  return (
    <button
      type="button"
      onClick={openInCalendar}
      className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--line)] px-4 py-2 text-sm font-bold text-[var(--teal-700)] transition-brand hover:bg-[var(--paper-alt)]"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 stroke-[var(--teal-700)]" fill="none" strokeWidth={2}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path strokeLinecap="round" d="M8 3v4M16 3v4M3 10h18M12 14v4M10 16h4" />
      </svg>
      Add to Calendar
    </button>
  );
}

export function UpcomingEventCard({ event }: { event: UpcomingEvent }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="block overflow-hidden rounded-[var(--radius-lg)] bg-white hairline shadow-[var(--shadow-sm)] transition-brand hover:shadow-[var(--shadow-md)]">
      <div className="relative h-40">
        {event.image ? (
          <Image src={event.image} alt={event.name} fill className="object-cover" />
        ) : (
          <PhotoPlaceholder className="absolute inset-0" />
        )}

        <span className="absolute left-3 top-3 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-bold text-[var(--ink)]">
          {event.category}
        </span>

        <button
          type="button"
          aria-label={saved ? "Remove from favorites" : "Save to favorites"}
          aria-pressed={saved}
          onClick={() => setSaved((v) => !v)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-[var(--shadow-sm)] backdrop-blur transition-brand hover:bg-white"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={saved ? "var(--gold)" : "none"}
            stroke={saved ? "var(--gold)" : "var(--ink)"}
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s-7.5-4.6-10-9.1C.5 8.4 2.3 5 5.8 5c2 0 3.3 1 4.2 2.2C11 5.9 12.3 5 14.2 5c3.5 0 5.3 3.4 3.8 6.9C19.5 16.4 12 21 12 21z"
            />
          </svg>
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-[var(--ink)]">{event.name}</h3>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-[var(--ink-soft)]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-[var(--teal-600)]">
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
          </svg>
          <span className="truncate">{event.location}</span>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[var(--ink-soft)]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 stroke-[var(--teal-600)]" fill="none" strokeWidth={2}>
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M12 7v5l3 2" />
          </svg>
          <span>{event.date}</span>
        </div>

        <div className="mt-4 border-t border-[var(--line)] pt-4">
          <span className="text-base font-bold text-[var(--teal-700)]">{event.price}</span>
        </div>

        <AddToCalendarButton event={event} />

        {event.link && (
          <Link
            href={event.link}
            className="mt-4 block text-center text-sm font-bold text-[var(--teal-700)] transition-brand hover:text-[var(--teal-600)]"
          >
            Learn more
          </Link>
        )}
      </div>
    </div>
  );
}
