import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { AiOutlineLink } from "react-icons/ai";

import { members } from "@members";
import { PostItem, Member } from "@src/types";
import { PostList } from "@src/components/PostList";
import { ContentWrapper } from "@src/components/ContentWrapper";
import { PageSEO } from "@src/components/PageSEO";
import { Avatar } from "@src/components/Avatar";
import {
  getMemberById,
  getMemberPostsById,
  getMemberPath,
} from "@src/utils/helper";

type Props = {
  postItems: PostItem[];
  member: Member;
};

const Page: NextPage<Props> = (props) => {
  const {
    id,
    name,
    bio,
    avatarSrc,
    twitterUsername,
    githubUsername,
    websiteUrl,
  } = props.member;

  return (
    <>
      <PageSEO title={name} path={getMemberPath(id)} />
      <section className="member">
        <ContentWrapper>
          <header className="member-header">
            <div className="member-header__avatar">
              <Avatar
                memberId={id}
                originalSrc={avatarSrc}
                alt={name}
                width={100}
                height={100}
                className="member-header__avatar-img"
              />
            </div>
            <h1 className="member-header__name">{name}</h1>
            <p className="member-header__bio">{bio}</p>
            <div className="member-header__links">
              {twitterUsername && (
                <a
                  href={`https://x.com/${twitterUsername}`}
                  className="member-header__link"
                >
                  <FaXTwitter
                    className="member-header__link-icon"
                    aria-label={`Follow @${twitterUsername} on Twitter`}
                  />
                </a>
              )}
              {githubUsername && (
                <a
                  href={`https://github.com/${githubUsername}`}
                  className="member-header__link"
                >
                  <FaGithub
                    className="member-header__link-icon"
                    aria-label={`@${githubUsername} on GitHub`}
                  />
                </a>
              )}
              {websiteUrl && (
                <a href={websiteUrl} className="member-header__link">
                  <AiOutlineLink
                    className="member-header__link-icon"
                    aria-label={`Link to website`}
                  />
                </a>
              )}
            </div>
          </header>

          <div className="member-posts-container">
            <PostList items={props.postItems} />
          </div>
        </ContentWrapper>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string;
  const member = getMemberById(id);
  const postItems = getMemberPostsById(id);

  if (!member) throw "User not found";

  return {
    props: {
      member,
      postItems,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const memberNameList = members.map((member) => encodeURIComponent(member.id));
  const paths = memberNameList.map((id) => {
    return {
      params: {
        id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export default Page;
