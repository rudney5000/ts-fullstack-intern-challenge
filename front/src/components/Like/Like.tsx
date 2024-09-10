import { useState } from "react";
import { deleteLike, addLike } from "../../api/likeApi";
import { useAuth } from "../../contexts/AuthContext";
import style from "./Like.module.scss";

interface LikeProps {
  blockId: string;
  isLiked: boolean;
  setIsLiked: (value: boolean) => void;
}

export default function Like({ blockId, isLiked, setIsLiked }: LikeProps) {
  const [isFilled, setIsFilled] = useState<boolean>(isLiked);
  const { isAuthorized, setDisplayLogin } = useAuth();

  async function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    (e.currentTarget as HTMLElement).blur();
    if (isAuthorized) {
      isLiked ? await deleteLike(blockId) : await addLike(blockId);
      isLiked ? setIsFilled(false) : setIsFilled(true);
      setIsLiked(!isLiked);
    } else {
      setDisplayLogin(true);
    }
  }

  function handleMouseEnter() {
    !isLiked && setIsFilled(true);
  }

  function handleMouseLeave() {
    !isLiked && setIsFilled(false);
  }

  return (
    <div
      className={`${style.like} ${isFilled ? style.filled : style.empty}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  );
}

