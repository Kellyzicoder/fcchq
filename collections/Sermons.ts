import type { CollectionConfig } from "payload";

export const Sermons: CollectionConfig = {
  slug: "sermons",
  labels: {
    singular: "Pinned Sermon",
    plural: "Pinned Sermons",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "channel", "publishedDate"],
    description:
      "Manually pinned sermon videos shown alongside the auto-fetched YouTube feed — use this to feature a video the feed hasn't picked up yet, or one from outside the usual channel.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "channel",
      type: "select",
      required: true,
      defaultValue: "fcc",
      options: [
        { label: "Favourite Child Church", value: "fcc" },
        { label: "Bishop Dag Heward-Mills", value: "dag" },
      ],
      admin: {
        description: "Which sermons section this appears in",
      },
    },
    {
      name: "youtubeUrl",
      type: "text",
      required: true,
      admin: {
        description: "Full YouTube video URL",
      },
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Optional — defaults to the video's own YouTube thumbnail if left blank",
      },
    },
    {
      name: "publishedDate",
      type: "date",
    },
    {
      name: "order",
      type: "number",
      admin: {
        description: "Lower numbers show first, ahead of the auto-fetched videos",
      },
    },
  ],
  defaultSort: "order",
};
