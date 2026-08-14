import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      defaultValue: "Favourite Child Church",
    },
    {
      name: "shortName",
      type: "text",
      defaultValue: "FCC",
    },
    {
      name: "address",
      type: "text",
      required: true,
    },
    {
      name: "contactEmail",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "heroVideo",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Looping background video on the homepage hero",
      },
    },
    {
      type: "group",
      name: "social",
      fields: [
        {
          name: "youtubeChannelId",
          type: "text",
          admin: {
            description: "Used to pull the live sermon feed via YouTube RSS",
          },
        },
        {
          name: "youtubeHandle",
          type: "text",
        },
        {
          name: "youtubeUrl",
          type: "text",
          admin: {
            description: "Where \"Watch Live\" / YouTube links point (e.g. the streams tab)",
          },
        },
        {
          name: "podcastUrl",
          type: "text",
        },
        {
          name: "applePodcastUrl",
          type: "text",
        },
        {
          name: "linktreeUrl",
          type: "text",
        },
        {
          name: "dagHewardMillsChannelId",
          type: "text",
          defaultValue: "UCmpJUHS40NNiHGCV_K7ya-A",
          admin: {
            description:
              'YouTube channel ID for Bishop Dag Heward-Mills (@daghewardmillsvideos) — used to pull his recent sermons via YouTube RSS',
          },
        },
        {
          name: "dagHewardMillsChannelUrl",
          type: "text",
          defaultValue: "https://youtube.com/@daghewardmillsvideos",
        },
      ],
    },
  ],
};
