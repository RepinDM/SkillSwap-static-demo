import { Avatar } from "../Avatar/Avatar";

type Props = {
  name: string;
  avatar?: string;
  city?: string;
  age?: number;
};

export const User = ({ name, avatar, city, age }: Props) => {
  return (
    <>
      <Avatar src={avatar} />
      <h3>{name}</h3>
      <p>{city}{age} года</p>
    </>
  );
};