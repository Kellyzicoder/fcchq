import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "../payload.config.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../public");

function mimeFor(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".mp4") return "video/mp4";
  throw new Error(`Unknown mime type for ${filePath}`);
}

async function main() {
  const payload = await getPayload({ config });

  console.log("Clearing existing seeded collections...");
  for (const slug of [
    "events",
    "upcoming-events",
    "announcements",
    "videos",
    "sermons",
    "resources",
    "media",
  ] as const) {
    const { docs } = await payload.find({ collection: slug, limit: 1000 });
    for (const doc of docs) {
      await payload.delete({ collection: slug, id: doc.id });
    }
  }

  const uploadedByPath = new Map<string, string>();

  async function upload(relativePublicPath: string, alt: string): Promise<string> {
    const cached = uploadedByPath.get(relativePublicPath);
    if (cached) return cached;

    const filePath = path.join(publicDir, relativePublicPath);
    const data = fs.readFileSync(filePath);
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      file: {
        data,
        mimetype: mimeFor(filePath),
        name: path.basename(filePath),
        size: data.length,
      },
    });
    uploadedByPath.set(relativePublicPath, doc.id as string);
    console.log(`Uploaded ${relativePublicPath} -> ${doc.id}`);
    return doc.id as string;
  }

  // --- Events ---
  const events = [
    {
      name: "Resurrection Sunday",
      date: "April 4, 2026",
      image: "/images/events/resurrection-sunday.jpg",
      link: "https://www.facebook.com/media/set/?set=a.1431065759065817&type=3",
    },
    {
      name: "International Sunday",
      date: "September 14, 2025",
      image: "/images/events/international-sunday.jpg",
      link: "https://www.facebook.com/media/set/?set=a.1237389891766739&type=3",
    },
    {
      name: "Appreciation Sunday",
      date: "December 28, 2025",
      image: "/images/events/appreciation-sunday.jpg",
      link: "https://www.facebook.com/media/set/?set=a.1336914211814306&type=3",
    },
    {
      name: "Love As Strong As Death",
      date: "February 15, 2026",
      image: "/images/events/love-as-strong-as-death.jpg",
      link: "https://www.facebook.com/media/set/?set=a.1383487023823691&type=3",
    },
    {
      name: "Valentine Sunday Service",
      date: "February 2026",
      image: "/images/events/valentine-sunday-service.jpg",
      link: "https://www.facebook.com/media/set/?set=a.1383489513823442&type=3",
    },
    {
      name: "Mothers Day",
      date: "May 2026",
      image: "/images/events/mothers-day.jpg",
      link: "https://www.facebook.com/media/set/?set=a.1459952252843834&type=3",
    },
    {
      name: "Fathers Day",
      date: "September 2025",
      image: "/images/events/fathers-day.jpg",
      link: "https://www.facebook.com/media/set/?set=a.1233433602162368&type=3",
    },
    {
      name: "Christmas Service",
      date: "December 2025",
      image: "/images/events/christmas-service.jpg",
      link: "https://www.facebook.com/media/set/?set=a.1020091870163210&type=3",
    },
    {
      name: "Carols Night 2024",
      date: "December 2024",
      image: "/images/events/carols-night.jpg",
      link: "https://www.facebook.com/media/set/?set=a.1016664190505978&type=3",
    },
  ];

  for (const [index, event] of events.entries()) {
    const imageId = await upload(event.image, event.name);
    await payload.create({
      collection: "events",
      data: {
        name: event.name,
        date: event.date,
        link: event.link,
        image: imageId,
        order: index,
      },
    });
  }
  console.log(`Seeded ${events.length} events.`);

  // --- Upcoming Events (homepage "Upcoming Events" section) ---
  const upcomingEvents = [
    {
      // NZST (UTC+12) — daylight saving starts the last Sunday of September
      name: "Encounter Service",
      category: "Worship",
      startDate: "2026-08-30T18:00:00+12:00",
      price: "Free",
      attendeeCount: 130,
      image: "/images/events/encounter-service.jpg",
    },
    {
      name: "Rising Stars Youth Night",
      category: "Youth",
      startDate: "2026-09-13T18:00:00+12:00",
      durationMinutes: 150,
      price: "Free",
      attendeeCount: 85,
      image: "/images/events/rising-stars.jpg",
    },
    {
      // NZDT (UTC+13)
      name: "International Sunday",
      category: "Outreach",
      startDate: "2026-10-04T10:00:00+13:00",
      price: "Free",
      attendeeCount: 210,
      image: "/images/events/international-sunday.jpg",
    },
    {
      name: "Appreciation Sunday",
      category: "Service",
      startDate: "2026-11-08T10:00:00+13:00",
      price: "Free",
      attendeeCount: 260,
      image: "/images/events/appreciation-sunday.jpg",
    },
    {
      name: "Christmas Service",
      category: "Service",
      startDate: "2026-12-25T10:00:00+13:00",
      durationMinutes: 90,
      price: "Free",
      attendeeCount: 300,
      image: "/images/events/christmas-service.jpg",
    },
  ];

  for (const [index, event] of upcomingEvents.entries()) {
    const imageId = await upload(event.image, event.name);
    await payload.create({
      collection: "upcoming-events",
      data: {
        name: event.name,
        category: event.category,
        startDate: event.startDate,
        durationMinutes: event.durationMinutes,
        location: "Favourite Child Church, Auckland",
        price: event.price,
        attendeeCount: event.attendeeCount,
        image: imageId,
        order: index,
      },
    });
  }
  console.log(`Seeded ${upcomingEvents.length} upcoming events.`);

  // --- Announcements (Weekly Rhythm) ---
  const schedule = [
    {
      name: "Sunday Service",
      time: "10:00 AM",
      image: "/images/announcements/sunday_service.jpg",
    },
    {
      name: "Bible Study",
      time: "Mondays, Thursdays, Fridays",
      image: "/images/announcements/bible_studies.jpg",
    },
    {
      name: "Midweek Service",
      time: "Wednesdays, 7:00 PM",
      detail: "A midweek reset of worship and the Word to carry you through to Sunday.",
      image: "/images/announcements/midweek.jpg",
    },
    {
      name: "Dawn Prayers",
      time: "5:00 AM daily",
      detail: "Except Saturdays. Thursdays 4:00–6:00 AM. Via Zoom.",
      image: "/images/announcements/dawn_prayers.jpg",
    },
    {
      name: "Flow",
      time: "Tue & Fri 4:30 PM · Sun 9:00 PM",
      detail: "Flow Prayer (Tue/Fri) and Flow Church (Sun) with Dag Heward-Mills.",
      image: "/images/announcements/flow_prayers.jpg",
      link: "https://www.youtube.com/results?search_query=flow+church",
    },
    {
      name: "Ministries",
      time: "Ongoing",
      detail: "Speak to any pastor to get connected and start serving.",
      image: "/images/announcements/join_a_ministry.jpg",
    },
  ];

  for (const [index, item] of schedule.entries()) {
    const imageId = await upload(item.image, item.name);
    await payload.create({
      collection: "announcements",
      data: {
        name: item.name,
        time: item.time,
        detail: item.detail,
        link: item.link,
        image: imageId,
        order: index,
      },
    });
  }
  console.log(`Seeded ${schedule.length} announcements.`);

  // --- Videos ---
  const videos = [
    {
      name: "Baptism",
      description: "New believers taking the step of water baptism at FCC.",
      file: "/videos/baptism.mp4",
    },
    {
      name: "Jesus March",
      description: "FCC on the streets, marching and worshipping in the name of Jesus.",
      file: "/videos/jesus-march.mp4",
    },
  ];

  for (const [index, video] of videos.entries()) {
    const fileId = await upload(video.file, video.name);
    await payload.create({
      collection: "videos",
      data: {
        name: video.name,
        description: video.description,
        file: fileId,
        order: index,
      },
    });
  }
  console.log(`Seeded ${videos.length} videos.`);

  // --- Resources ---
  const resources = [
    { name: "Dag Books", url: "https://dagbooks.org/" },
    { name: "First Love Music", url: "https://firstlovemusic.org/" },
    { name: "Dag Bible App", url: "https://www.dagbible.org/" },
    { name: "Dag Sermons App", url: "https://daghewardmills.org/dag-sermons-app" },
    { name: "Dagpreaching.org", url: "https://dagpreaching.org/" },
    {
      name: "Dag Heward-Mills on YouTube",
      url: "https://www.youtube.com/channel/UCmpJUHS40NNiHGCV_K7ya-A",
    },
  ];

  for (const [index, resource] of resources.entries()) {
    await payload.create({
      collection: "resources",
      data: { ...resource, order: index },
    });
  }
  console.log(`Seeded ${resources.length} resources.`);

  // --- Site Settings ---
  const logoId = await upload("/logo.png", "Favourite Child Church logo");
  const heroVideoId = await upload("/videos/jesus-march.mp4", "Hero background video");

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      name: "Favourite Child Church",
      shortName: "FCC",
      address: "20B Te Pai Place, Henderson, Auckland 0610",
      contactEmail: "favouritechildchurch@gmail.com",
      logo: logoId,
      heroVideo: heroVideoId,
      social: {
        youtubeChannelId: "UC-Z-KRBn3nxS_eHtVCX16fw",
        youtubeHandle: "@favouritechildchurch",
        youtubeUrl: "https://www.youtube.com/@favouritechildchurch/streams",
        podcastUrl: "https://dagpreaching.org",
        applePodcastUrl:
          "https://podcasts.apple.com/nz/podcast/dag-heward-mills/id1560919244",
        linktreeUrl: "https://linktr.ee/fcchq",
        dagHewardMillsChannelId: "UCmpJUHS40NNiHGCV_K7ya-A",
        dagHewardMillsChannelUrl: "https://youtube.com/@daghewardmillsvideos",
      },
    },
  });
  console.log("Updated site settings.");

  console.log("Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
