import type { CollectionConfig } from "payload";

export const UpcomingEvents: CollectionConfig = {
  slug: "upcoming-events",
  labels: {
    singular: "Upcoming Event",
    plural: "Upcoming Events",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "startDate", "category", "location"],
    description:
      'Forward-looking events shown in the homepage "Upcoming Events" section. For photo galleries of past special Sundays, use the Events collection instead.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "text",
      defaultValue: "Service",
      admin: {
        description: 'Short tag shown on the card, e.g. "Service", "Youth", "Music"',
      },
    },
    {
      name: "startDate",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        description: "Used to sort the list and to auto-hide the event once it's passed",
      },
    },
    {
      name: "location",
      type: "text",
      defaultValue: "Favourite Child Church, Auckland",
    },
    {
      name: "durationMinutes",
      type: "number",
      defaultValue: 120,
      admin: {
        description:
          'How long the event runs, in minutes — used for the end time on "Add to Calendar" links. Defaults to 2 hours.',
      },
    },
    {
      name: "price",
      type: "text",
      defaultValue: "Free",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "link",
      type: "text",
      admin: {
        description: 'Where the card\'s "Learn more" link points to, if anywhere',
      },
    },
    {
      name: "order",
      type: "number",
      admin: {
        description: "Lower numbers show first among events on the same day",
      },
    },
  ],
  defaultSort: "startDate",
};
