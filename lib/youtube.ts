import { site } from "./site-data";

export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  published: string;
};

function decodeEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extract(tag: string, block: string) {
  const match = block.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
  return match ? decodeEntities(match[1].trim()) : "";
}

export async function getLatestVideos(limit = 6): Promise<Video[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${site.youtubeChannelId}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

    return entries.slice(0, limit).map((entry) => {
      const id = extract("yt:videoId", entry);
      return {
        id,
        title: extract("media:title", entry) || extract("title", entry),
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        published: extract("published", entry),
      };
    });
  } catch {
    return [];
  }
}
