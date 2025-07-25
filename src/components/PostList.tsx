import { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { PostItem } from "@src/types";
import {
  getFaviconSrcFromOrigin,
  getMemberPath,
  getMemberById,
} from "@src/utils/helper";
import { Avatar } from "@src/components/Avatar";

dayjs.extend(relativeTime);

const PostLink: React.FC<{ item: PostItem }> = (props) => {
  const { authorId, title, isoDate, link, dateMiliSeconds, contentSnippet } =
    props.item;
  const member = getMemberById(authorId);
  if (!member) return null;

  const { hostname, origin } = new URL(link);

  return (
    <article className="post-link">
      <Link
        href={getMemberPath(member.id)}
        passHref
        className="post-link__author"
      >
        <Avatar
          memberId={member.id}
          originalSrc={member.avatarSrc}
          className="post-link__author-img"
          width={35}
          height={35}
          alt={member.name}
        />
        <div className="post-link__author-name">
          <div className="post-link__author-name">{member.name}</div>
          <time dateTime={isoDate} className="post-link__date">
            {dayjs(isoDate).fromNow()}
          </time>
        </div>
      </Link>
      <a href={link} className="post-link__main-link" target="_blank" rel="noopener noreferrer">
        <h2 className="post-link__title">{title}</h2>
        {hostname && (
          <div className="post-link__site">
            <img
              src={getFaviconSrcFromOrigin(origin)}
              width={14}
              height={14}
              className="post-link__site-favicon"
              alt={hostname}
            />
            {hostname}
          </div>
        )}
        {contentSnippet && (
          <p className="post-link__description">
            {contentSnippet.length > 100
              ? contentSnippet.slice(0, 100) + "..."
              : contentSnippet}
          </p>
        )}
      </a>
      {dateMiliSeconds && dateMiliSeconds > Date.now() - 86400000 * 3 && (
        <div className="post-link__new-label">NEW</div>
      )}
    </article>
  );
};

export const PostList: React.FC<{ items: PostItem[] }> = (props) => {
  const [displayItemsCount, setDisplayItemsCount] = useState<number>(32);
  const totalItemsCount = props.items?.length || 0;
  const canLoadMore = totalItemsCount - displayItemsCount > 0;

  if (!totalItemsCount) {
    return <div className="post-list-empty">No posts yet</div>;
  }

  return (
    <>
      <div className="post-list">
        {props.items.slice(0, displayItemsCount).map((item, i) => (
          <PostLink key={`post-item-${i}`} item={item} />
        ))}
      </div>
      {canLoadMore && (
        <div className="post-list-load">
          <button
            onClick={() => setDisplayItemsCount(displayItemsCount + 32)}
            className="post-list-load__button"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </>
  );
};
