import Link from "next/link";
import { members } from "@members";
import { getMemberPath } from "@src/utils/helper";
import { Avatar } from "@src/components/Avatar";

export const ScrollableMembers: React.FC = () => {
  return (
    <div className="scrollable-members">
      {members.map((member, i) => (
        (<Link
          key={`scrollable-member-${i}`}
          href={getMemberPath(member.id)}
          passHref
          className="scrollable-member__link">

          <span className="scrollable-member__image">
            <Avatar
              memberId={member.id}
              originalSrc={member.avatarSrc}
              alt={member.name}
              className="scrollable-member__img"
              width={80}
              height={80}
            />
          </span>
          <span className="scrollable-member__name">{member.name}</span>
          <span className="scrollable-member__role">{member.role}</span>

        </Link>)
      ))}
    </div>
  );
};
