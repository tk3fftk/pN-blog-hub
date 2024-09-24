export const config = {
  siteMeta: {
    title: "pN Blog Hub",
    teamName: "primeNumber Inc.",
    description: "primeNumber unofficial fansite.",
  },
  siteRoot:
    process.env.NODE_ENV === "production"
      ? "https://pn-blog-hub.pages.dev"
      : "http://localhost:8788",
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
