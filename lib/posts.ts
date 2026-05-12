export type Post = {
  slug: string;
  date: string;
  dateLabel: string;
  title: string;
  minutes: number;
};

export const posts: Post[] = [
  {
    slug: "on-legacy-systems-and-the-courage-to-leave-them-alone",
    date: "2026-05-02",
    dateLabel: "may 02",
    title: "On legacy systems and the courage to leave them alone",
    minutes: 11,
  },
  {
    slug: "what-principal-actually-means-at-scale",
    date: "2026-04-18",
    dateLabel: "apr 18",
    title: 'What "principal" actually means at scale',
    minutes: 7,
  },
  {
    slug: "postgres-at-12tb-the-boring-playbook",
    date: "2026-03-24",
    dateLabel: "mar 24",
    title: "Postgres at 12TB — the boring playbook",
    minutes: 14,
  },
  {
    slug: "notes-on-writing-specs-people-read",
    date: "2026-02-09",
    dateLabel: "feb 09",
    title: "Notes on writing specs people read",
    minutes: 5,
  },
  {
    slug: "hiring-for-staff-plus-engineers-in-three-signals",
    date: "2026-01-21",
    dateLabel: "jan 21",
    title: "Hiring for staff+ engineers, in three signals",
    minutes: 9,
  },
  {
    slug: "distributed-systems-are-mostly-humans",
    date: "2025-12-12",
    dateLabel: "dec 12",
    title: "Distributed systems are mostly humans",
    minutes: 8,
  },
];
