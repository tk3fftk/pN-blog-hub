import Link from "next/link";
import { config } from "@site.config";
import { FaGithub } from "react-icons/fa6";

import { ContentWrapper } from "@src/components/ContentWrapper";

export const SiteHeader: React.FC = () => (
  <header className="site-header">
    <ContentWrapper>
      <div className="site-header__inner">
        <Link href="/" passHref className="site-header__logo-link">
          <img
            src="/logo.png"
            alt={config.siteMeta.title}
            className="site-header__logo-img"
          />
        </Link>
        <div className="site-header__links">
          {config.headerLinks.map((link, i) => {
            const key = `header-link-${i}`;
            if (link.href.startsWith("/")) {
              return (
                <Link
                  key={key}
                  href={link.href}
                  passHref
                  className="site-header__link"
                >
                  {link.title}
                </Link>
              );
            } else if (link.title === "GitHub") {
              return (
                <a key={key} href={link.href} className="site-header__link">
                  <FaGithub
                    className="site-header__link-icon"
                    aria-label={`GitHub Repository`}
                  />
                </a>
              );
            } else {
              return (
                <a key={key} href={link.href} className="site-header__link">
                  {link.title}
                </a>
              );
            }
          })}
        </div>
      </div>
    </ContentWrapper>
  </header>
);
