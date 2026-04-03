import { type FC, useState } from "react";
import defaultAvatar from "@/shared/image/icons/user-circle.svg";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar: FC<AvatarProps> = ({ src, alt = "", size = 48 }) => {
  const [hasError, setHasError] = useState(false);
  const imgSrc = src && !hasError ? src : defaultAvatar;

  return (
    <div className={styles.avatar} style={{ width: size, height: size }}>
      <img
        className={styles.image}
        src={imgSrc}
        alt={alt}
        onError={() => setHasError(true)}
      />
    </div>
  );
};
