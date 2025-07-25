import { NextPage } from "next";
import Link from "next/link";

import { config } from "@site.config";
import { members } from "@members";
import { ContentWrapper } from "@src/components/ContentWrapper";
import { PageSEO } from "@src/components/PageSEO";
import { Avatar } from "@src/components/Avatar";
import { getMemberPath } from "@src/utils/helper";
import { Member } from "@src/types";

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  return (
    <Link href={getMemberPath(member.id)} className="member-card" passHref>
      <div className="member-card__avatar">
        <Avatar
          memberId={member.id}
          originalSrc={member.avatarSrc}
          alt={member.name}
          width={80}
          height={80}
          className="member-card__avatar-img"
        />
      </div>
      <h2 className="member-card__name"> {member.name}</h2>
      <p className="member-card__bio">{member.bio}</p>
    </Link>
  );
};

const Page: NextPage = () => {
  return (
    <>
      <PageSEO title="Members" path="/members" />
      <ContentWrapper>
        <section className="members">
          <h1 className="members__title">
            Members{" "}
            <span className="members__title-team">
              @ {config.siteMeta.teamName}
            </span>
          </h1>
          <div className="members__cards">
            {members.map((member, i) => (
              <MemberCard key={`member-card-${i}`} member={member} />
            ))}
          </div>
        </section>
      </ContentWrapper>
    </>
  );
};

export default Page;
