export const podcastPromoImage = "/images/announcements/podcast.jpg";

export const site = {
  name: "Favourite Child Church",
  shortName: "FCC",
  address: "20 Te Pai Place, Henderson, Auckland",
  youtubeChannelId: "UC-Z-KRBn3nxS_eHtVCX16fw",
  youtubeHandle: "@favouritechildchurch",
  youtubeUrl: "https://www.youtube.com/@favouritechildchurch",
  podcastUrl: "https://dagpreaching.org",
  applePodcastUrl:
    "https://podcasts.apple.com/nz/podcast/dag-heward-mills/id1560919244",
  linktreeUrl: "https://linktr.ee/fcchq",
};

export type Resource = {
  name: string;
  url: string;
};

export const dagResources: Resource[] = [
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

export type ScheduleItem = {
  name: string;
  time: string;
  detail?: string;
  image: string;
  link?: string;
};

export type SpecialEvent = {
  name: string;
  date: string;
  image: string;
  link?: string;
};

export const specialEvents: SpecialEvent[] = [
  {
    name: "Resurrection Sunday",
    date: "April 4, 2026",
    image: "/images/events/resurrection-sunday.jpg",
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
  },
  {
    name: "Valentine Encounter",
    date: "February 15, 2026",
    image: "/images/events/valentine-encounter.jpg",
    link: "https://www.facebook.com/media/set/?set=a.1383487023823691&type=3",
  },
  {
    name: "Rising Stars",
    date: "March 22, 2026",
    image: "/images/events/rising-stars.jpg",
  },
  {
    name: "Encounter Service",
    date: "Every Sunday",
    image: "/images/events/encounter-service.jpg",
  },
  {
    name: "Carols Night",
    date: "December",
    image: "/images/events/carols-night.jpg",
    link: "https://www.facebook.com/media/set/?set=a.1016664190505978&type=3",
  },
];

export const schedule: ScheduleItem[] = [
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
