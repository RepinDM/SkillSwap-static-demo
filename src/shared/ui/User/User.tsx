import { getAgeLabel } from "@/shared/lib/Age/getAgeLabel";
import { Avatar } from "../Avatar/Avatar";
import styles from "./User.module.scss";

type Props = {
  name: string;
  avatar?: string;
  city?: string;
  age?: number;
  avatarSize?: number;
  about?: string;
};

export const User = ({ name, avatar, city, age, avatarSize = 48, about }: Props) => {
  return (
    <>
      <Avatar src={avatar} size={avatarSize} />
      <div>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.info}>{city}, {age && `${age} ${getAgeLabel(age)}`}</p>
        <p>{about}</p>
      </div>
    </>
  );
};