import type { CollectionConfig } from "payload";

export const Videos: CollectionConfig = {
  slug: "videos",
  admin: {
    useAsTitle: "name",
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
      name: "description",
      type: "textarea",
    },
    {
      name: "file",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "order",
      type: "number",
    },
  ],
  defaultSort: "order",
};
