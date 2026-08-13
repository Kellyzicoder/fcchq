import type { GlobalConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const About: GlobalConfig = {
  slug: "about",
  label: "About Page",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "heading",
      type: "text",
      defaultValue: "About Us",
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Founder photo, church photo, or whatever fits best",
      },
    },
    {
      name: "body",
      type: "richText",
      editor: lexicalEditor(),
      admin: {
        description: "Full story, mission, founder info — as much as you want",
      },
    },
  ],
};
