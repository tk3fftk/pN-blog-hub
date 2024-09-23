import { Member } from "@src/types";

export const members: Member[] = [
  {
    id: "catnose",
    name: "CatNose",
    role: "CTO",
    bio: "デザインが好きなプログラマー。開発者向けの情報共有プラットフォームzenn.devを開発しています。",
    avatarSrc: "/avatars/catnose.jpg",
    sources: [
      "https://zenn.dev/catnose99/feed",
      "https://catnose.medium.com/feed",
    ],
    includeUrlRegex: "medium.com|zenn.dev",
    twitterUsername: "catnose99",
    githubUsername: "catnose99",
    websiteUrl: "https://catnose99.com",
  },
  {
    id: "john_doe",
    name: "John Doe",
    role: "SRE",
    bio: "Site Reliability Engineer.",
    avatarSrc: "/avatars/doe.jpg",
    sources: ["https://note.com/catnose/rss"],
    excludeUrlRegex: "n3a59e3cdd820",
    twitterUsername: "catnose99",
  },
];
