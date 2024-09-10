import { useState } from "react";
import style from "./Block.module.scss";
import Like from "../Like/Like";
import BlockType from "../../types/BlockType";

interface BlockProps {
  data: BlockType;
  onLikeClick: (value: boolean) => void;
}

export default function Block({ data, onLikeClick }: BlockProps) {
  const [isLiked, setIsLiked] = useState(data.isLiked);
  const [isHovered, setIsHovered] = useState(false);

  function onClick(value: boolean) {
    setIsLiked(value);
    onLikeClick(true);
  }

  return (
    <div
      className={style.block}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={style.image__wrapper}>
        <img className={style.image} src={data.url} alt="Cat image" />
      </div>
      {isHovered && (
        <div className={style.block__like}>
          <Like blockId={data.id} isLiked={isLiked} setIsLiked={onClick} />
        </div>
      )}
    </div>
  );
}

