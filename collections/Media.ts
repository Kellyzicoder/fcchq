import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
  },
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ["image/*", "video/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
