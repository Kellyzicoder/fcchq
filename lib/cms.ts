import { getPayload } from "payload";
import config from "@/payload.config";
import type {
  Event,
  UpcomingEvent,
  Announcement,
  Video,
  Sermon,
  Resource,
  Media,
  SiteSetting,
  About,
} from "@/payload-types";

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

const CHURCH_TIME_ZONE = "Pacific/Auckland";

function formatEventDateTime(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "short",
    timeZone: CHURCH_TIME_ZONE,
  });
  const time = d.toLocaleTimeString("en-NZ", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: CHURCH_TIME_ZONE,
  });
  return `${date} · ${time}`;
}

const DEFAULT_EVENT_DURATION_MINUTES = 120;

export type CmsUpcomingEvent = {
  name: string;
  category: string;
  date: string;
  startDate: string;
  endDate: string;
  location: string;
  price: string;
  image?: string;
  link?: string | null;
};

export async function getUpcomingEvents(limit = 8): Promise<CmsUpcomingEvent[]> {
  const p = await payload();
  const { docs } = await p.find({
    collection: "upcoming-events",
    depth: 1,
    sort: "startDate",
    limit,
    where: {
      startDate: { greater_than_equal: new Date().toISOString() },
    },
  });
  return (docs as UpcomingEvent[]).map((doc) => {
    const durationMinutes = doc.durationMinutes || DEFAULT_EVENT_DURATION_MINUTES;
    const endDate = new Date(
      new Date(doc.startDate).getTime() + durationMinutes * 60_000
    ).toISOString();
    return {
      name: doc.name,
      category: doc.category || "Service",
      date: formatEventDateTime(doc.startDate),
      startDate: doc.startDate,
      endDate,
      location: doc.location || "Favourite Child Church, Auckland",
      price: doc.price || "Free",
      image: mediaUrl(doc.image),
      link: doc.link,
    };
  });
}

function videoIdFromUrl(url: string): string | undefined {
  return url.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{6,})/)?.[1];
}

export type CmsPinnedSermon = {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  published?: string | null;
};

export async function getPinnedSermons(channel: "fcc" | "dag"): Promise<CmsPinnedSermon[]> {
  const p = await payload();
  const { docs } = await p.find({
    collection: "sermons",
    depth: 1,
    sort: "order",
    limit: 50,
    where: { channel: { equals: channel } },
  });
  return (docs as Sermon[]).map((doc) => {
    const videoId = videoIdFromUrl(doc.youtubeUrl);
    return {
      id: doc.id,
      title: doc.title,
      url: doc.youtubeUrl,
      thumbnail:
        mediaUrl(doc.thumbnail) ??
        (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined),
      published: doc.publishedDate,
    };
  });
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
  dagHewardMillsChannelId?: string | null;
  dagHewardMillsChannelUrl?: string | null;
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
    dagHewardMillsChannelId: settings.social?.dagHewardMillsChannelId,
    dagHewardMillsChannelUrl: settings.social?.dagHewardMillsChannelUrl,
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
