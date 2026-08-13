import type { CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
  slug: "resources",
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
      name: "url",
      type: "text",
      required: true,
    },
    {
      name: "order",
      type: "number",
    },
  ],
  defaultSort: "order",
};
