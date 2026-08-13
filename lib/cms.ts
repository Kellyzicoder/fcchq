import { getPayload } from "payload";
import config from "@/payload.config";
import type { Event, Announcement, Video, Resource, Media, SiteSetting, About } from "@/payload-types";

async function payload() {
  return getPayload({ config });
}

function mediaUrl(media: string | Media | null | undefined): string | undefined {
  if (media && typeof media === "object") return media.url ?? undefined;
  return undefined;
}

export type CmsEvent = {
  name: string;
  date: string;
  image?: string;
  link?: string | null;
};

export async function getEvents(): Promise<CmsEvent[]> {
  const p = await payload();
  const { docs } = await p.find({
    collection: "events",
    depth: 1,
    sort: "order",
    limit: 100,
  });
  return (docs as Event[]).map((doc) => ({
    name: doc.name,
    date: doc.date,
    image: mediaUrl(doc.image),
    link: doc.link,
  }));
}

export type CmsAnnouncement = {
  name: string;
  time: string;
  detail?: string | null;
  image: string;
  link?: string | null;
};

export async function getAnnouncements(): Promise<CmsAnnouncement[]> {
  const p = await payload();
  const { docs } = await p.find({
    collection: "announcements",
    depth: 1,
    sort: "order",
    limit: 100,
  });
  return (docs as Announcement[]).map((doc) => ({
    name: doc.name,
    time: doc.time,
    detail: doc.detail,
    image: mediaUrl(doc.image) ?? "",
    link: doc.link,
  }));
}

export type CmsVideo = {
  name: string;
  description?: string | null;
  src: string;
};

export async function getVideos(): Promise<CmsVideo[]> {
  const p = await payload();
  const { docs } = await p.find({
    collection: "videos",
    depth: 1,
    sort: "order",
    limit: 100,
  });
  return (docs as Video[]).map((doc) => ({
    name: doc.name,
    description: doc.description,
    src: mediaUrl(doc.file) ?? "",
  }));
}

export type CmsResource = {
  name: string;
  url: string;
};

export async function getResources(): Promise<CmsResource[]> {
  const p = await payload();
  const { docs } = await p.find({
    collection: "resources",
    sort: "order",
    limit: 100,
  });
  return (docs as Resource[]).map((doc) => ({ name: doc.name, url: doc.url }));
}

export type CmsSiteSettings = {
  name: string;
  shortName?: string | null;
  address: string;
  contactEmail: string;
  logo?: string;
  heroVideo?: string;
  youtubeChannelId?: string | null;
  youtubeHandle?: string | null;
  youtubeUrl?: string | null;
  podcastUrl?: string | null;
  applePodcastUrl?: string | null;
  linktreeUrl?: string | null;
};

export async function getSiteSettings(): Promise<CmsSiteSettings> {
  const p = await payload();
  const settings = (await p.findGlobal({ slug: "site-settings", depth: 1 })) as SiteSetting;
  return {
    name: settings.name,
    shortName: settings.shortName,
    address: settings.address,
    contactEmail: settings.contactEmail,
    logo: mediaUrl(settings.logo),
    heroVideo: mediaUrl(settings.heroVideo),
    youtubeChannelId: settings.social?.youtubeChannelId,
    youtubeHandle: settings.social?.youtubeHandle,
    youtubeUrl: settings.social?.youtubeUrl,
    podcastUrl: settings.social?.podcastUrl,
    applePodcastUrl: settings.social?.applePodcastUrl,
    linktreeUrl: settings.social?.linktreeUrl,
  };
}

export type CmsAbout = {
  heading?: string | null;
  photo?: string;
  body: About["body"];
};

export async function getAbout(): Promise<CmsAbout> {
  const p = await payload();
  const about = (await p.findGlobal({ slug: "about", depth: 1 })) as About;
  return {
    heading: about.heading,
    photo: mediaUrl(about.photo),
    body: about.body,
  };
}
