import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "date", "link"],
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
      name: "date",
      type: "text",
      required: true,
      admin: {
        description: 'Freeform, e.g. "April 4, 2026" or "Every Sunday"',
      },
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
        description: "Facebook photo album URL, if there is one",
      },
    },
    {
      name: "order",
      type: "number",
      admin: {
        description: "Lower numbers show first",
      },
    },
  ],
  defaultSort: "order",
};
