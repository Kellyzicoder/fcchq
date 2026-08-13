import type { CollectionConfig } from "payload";

export const Announcements: CollectionConfig = {
  slug: "announcements",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "time", "link"],
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
      name: "time",
      type: "text",
      required: true,
    },
    {
      name: "detail",
      type: "textarea",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "link",
      type: "text",
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
