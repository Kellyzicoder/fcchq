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

/** Parses a YouTube channel RSS feed (https://www.youtube.com/feeds/videos.xml?channel_id=...) into videos. */
export function parseYouTubeFeed(xml: string, limit = 10): Video[] {
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
}

/** Server-side only — youtube.com doesn't send CORS headers on this feed, so it can't be fetched from the browser directly. */
export async function fetchChannelVideos(channelId: string, limit = 10): Promise<Video[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    return parseYouTubeFeed(await res.text(), limit);
  } catch {
    return [];
  }
}
