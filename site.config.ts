export const config = {
  siteMeta: {
    title: "pN Blog Hub",
    teamName: "primeNumber Inc.",
    description: "primeNumber fun site.",
  },
  siteRoot:
    process.env.NODE_ENV === "production"
      ? "https://team-blog-hub.vercel.app"
      : "http://localhost:3000",
  headerLinks: [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Members",
      href: "/members",
    },
    {
      title: "Company",
      href: "https://primenumber.com/",
    },
    {
      title: "GitHub",
      href: "https://github.com/tk3fftk/pN-blog-hub",
    },
  ],
};
