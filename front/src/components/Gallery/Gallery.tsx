import { RefObject, useEffect, useRef, useState } from "react";
import style from "./Gallery.module.scss";

import { fetchCatImage, fetchCats } from "../../api/catsApi";

import Block from "../Block/Block";
import BlockType from "../../types/BlockType";
import { useAuth } from "../../contexts/AuthContext";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useLikes from "../../hooks/useLikes";
import { getLikes } from "../../api/likeApi";

interface GalleryProps {
  type: "all" | "likes";
  scrollRef: RefObject<HTMLDivElement>;
}

export default function Gallery({ type, scrollRef }: GalleryProps) {
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { isAuthorized } = useAuth();

  const likes = useLikes(type);
  useInfiniteScroll(scrollRef, loaderRef, hasMore, setPage);

  useEffect(() => {
    loadBlocks();
  }, [page, type]);

  useEffect(() => {
    setBlocks([]);
  }, [type]);

  function onLikeClick(catId: string) {
    if (type === "likes") {
      setBlocks((blocks) => blocks.filter((block) => block.id !== catId));
    }
  }

  function setNewBlock(id: string, url: string, isLiked: boolean) {
    const block: BlockType = { id, url, isLiked };
    setBlocks((blocks) => [...blocks, block]);
  }

  async function fetchBlocks<T>(
    fetchCallback: () => Promise<T[]>
  ): Promise<T[]> {
    const data = await fetchCallback();
    if (!data.length) {
      setHasMore(false);
      return [];
    }
    setHasMore(data.length > 90);
    return data;
  }

  async function loadBlocks(): Promise<void> {
    if (type === "all") {
      const cats = await fetchBlocks(() => fetchCats(page));
      for (const cat of cats) {
        const isLiked = isAuthorized && likes.some((l) => l.cat_id === cat.id);
        setNewBlock(cat.id, cat.url, isLiked);
      }
    }

    if (type === "likes") {
      const likes = await fetchBlocks(getLikes);
      for (const like of likes) {
        const url = await fetchCatImage(like.cat_id);
        setNewBlock(like.cat_id, url, true);
      }
    }
  }

  function getBlockComponent(i: number, block: BlockType) {
    return (
      <Block key={i} data={block} onLikeClick={() => onLikeClick(block.id)} />
    );
  }

  return (
    <section className={style.gallery}>
      <div className={style.gallery__blocks}>
        {blocks.map((block, i) => getBlockComponent(i, block))}
      </div>
      {hasMore ? (
        <div ref={loaderRef} className={style.loader}>
          Загружаем еще котиков...
        </div>
      ) : (
        <div className={style.loader}>Извините, котиков больше нет :(</div>
      )}
    </section>
  );
}

