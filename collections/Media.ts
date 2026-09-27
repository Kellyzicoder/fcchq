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
    // Any image uploaded through the admin is converted to WebP and capped at
    // 1600px wide, so new photos stay small without manual prep.
    formatOptions: { format: "webp", options: { quality: 78 } },
    resizeOptions: { width: 1600, withoutEnlargement: true },
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
