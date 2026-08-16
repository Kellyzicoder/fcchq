export type CalendarEventInput = {
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
  uid: string;
};

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/** RFC 5545 VCALENDAR — imports directly into Apple Calendar, Outlook, and most other calendar apps. */
export function buildIcsContent(event: CalendarEventInput): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Favourite Child Church//Upcoming Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(event.start)}`,
    `DTEND:${formatICSDate(event.end)}`,
    `SUMMARY:${escapeICSText(event.title)}`,
  ];
  if (event.location) lines.push(`LOCATION:${escapeICSText(event.location)}`);
  if (event.description) lines.push(`DESCRIPTION:${escapeICSText(event.description)}`);
  lines.push("END:VEVENT", "END:VCALENDAR");
  return lines.join("\r\n");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
