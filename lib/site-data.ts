export const site = {
  name: "Favourite Child Church",
  shortName: "FCC",
  address: "20 Te Pai Place, Henderson, Auckland",
  youtubeChannelId: "UC-Z-KRBn3nxS_eHtVCX16fw",
  youtubeHandle: "@favouritechildchurch",
  youtubeUrl: "https://www.youtube.com/@favouritechildchurch",
  podcastUrl: "https://dagpreaching.org",
  linktreeUrl: "https://linktr.ee/fcchq",
};

export type ScheduleItem = {
  name: string;
  time: string;
  detail?: string;
};

export type SpecialEvent = {
  name: string;
  date: string;
  image: string;
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
];

export const schedule: ScheduleItem[] = [
  { name: "Sunday Service", time: "10:00 AM" },
  { name: "Bible Study", time: "Mondays, Thursdays, Fridays" },
  {
    name: "Dawn Prayers",
    time: "5:00 AM daily",
    detail: "Except Saturdays. Thursdays 4:00–6:00 AM. Via Zoom.",
  },
  { name: "Flow Prayer", time: "Tuesdays & Fridays, 4:30 PM" },
  { name: "Flow Church", time: "Sundays, 9:00 PM" },
  {
    name: "Ministries",
    time: "Ongoing",
    detail: "Speak to any pastor to get connected and start serving.",
  },
];
