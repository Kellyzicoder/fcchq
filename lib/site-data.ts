export const podcastPromoImage = "/images/announcements/podcast.jpg";

export const site = {
  name: "Favourite Child Church",
  shortName: "FCC",
  address: "20B Te Pai Place, Henderson, Auckland 0610",
  youtubeChannelId: "UC-Z-KRBn3nxS_eHtVCX16fw",
  youtubeHandle: "@favouritechildchurch",
  youtubeUrl: "https://www.youtube.com/@favouritechildchurch",
  podcastUrl: "https://dagpreaching.org",
  applePodcastUrl:
    "https://podcasts.apple.com/nz/podcast/dag-heward-mills/id1560919244",
  linktreeUrl: "https://linktr.ee/fcchq",
  contactEmail: "favouritechildchurch@gmail.com",
};

export type MediaItem = {
  name: string;
  description: string;
  src: string;
};

export const mediaItems: MediaItem[] = [
  {
    name: "Baptism",
    description: "New believers taking the step of water baptism at FCC.",
    src: "/videos/baptism.mp4",
  },
  {
    name: "Jesus March",
    description: "FCC on the streets, marching and worshipping in the name of Jesus.",
    src: "/videos/jesus-march.mp4",
  },
];

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
  image?: string;
  link?: string;
};

export const specialEvents: SpecialEvent[] = [
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
