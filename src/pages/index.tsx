import { NextPage } from "next";
import { useState, useMemo } from "react";

import posts from "@.contents/posts.json";
import { config } from "@site.config";
import { PostItem } from "@src/types";
import { PostList } from "@src/components/PostList";
import { PageSEO } from "@src/components/PageSEO";
import { ContentWrapper } from "@src/components/ContentWrapper";
import { getBuildDate } from "@src/utils/helper";

const TOGGLE_AUTHORS = [
  { id: "trocco_blog", name: "TROCCO Blog" },
  { id: "pn_blog", name: "primeNumber Blog/Press Release and Podcast" },
];

const Page: NextPage = () => {
  // 全記事から筆者一覧を抽出
  const authors = useMemo(() => {
    const map = new Map<string, string>();
    (posts as PostItem[]).forEach((p) => {
      map.set(p.authorId, p.authorName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, []);

  // 筆者ごとの表示状態（デフォルト全員ON）
  const [visibleAuthors, setVisibleAuthors] = useState<Record<string, boolean>>({
    trocco_blog: true,
    pn_blog: true,
  });

  // トグル切り替え
  const handleToggle = (id: string) => {
    setVisibleAuthors((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // フィルタ後の記事
  const filteredPosts = useMemo(() => {
    return (posts as PostItem[]).filter((p) => {
      if (TOGGLE_AUTHORS.some((a) => a.id === p.authorId)) {
        return visibleAuthors[p.authorId];
      }
      return true; // それ以外は常に表示
    });
  }, [visibleAuthors]);

  return (
    <>
      <PageSEO
        title={config.siteMeta.title}
        description={config.siteMeta.description}
        path="/"
        removeSiteNameFromTitle={true}
      />

      <section className="home-hero">
        <ContentWrapper>
          <h1 className="home-hero__title">{config.siteMeta.title}</h1>
          {!!config.siteMeta.description && (
            <p className="home-hero__description">
              {config.siteMeta.description} ( Last Update: {getBuildDate()} )
            </p>
          )}
        </ContentWrapper>
      </section>

      <section className="author-toggle-section">
        <ContentWrapper>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
            {TOGGLE_AUTHORS.map((author) => (
              <label key={author.id} className="author-toggle-switch">
                <input
                  type="checkbox"
                  checked={visibleAuthors[author.id]}
                  onChange={() => handleToggle(author.id)}
                />
                <span>{author.name}</span>
              </label>
            ))}
          </div>
        </ContentWrapper>
      </section>

      <section className="home-posts">
        <ContentWrapper>
          <div className="home-section-title-container">
            <h2 className="home-section-title">Articles</h2>
          </div>

          <div className="home-posts-container">
            <PostList items={filteredPosts} />
          </div>
        </ContentWrapper>
      </section>
    </>
  );
};

export default Page;
