import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

function useInfiniteScroll(
  containerRef: RefObject<HTMLElement>,
  loaderRef: RefObject<HTMLElement>,
  hasMore: boolean,
  setPage: Dispatch<SetStateAction<number>>
) {
  useEffect(() => {
    const handleScroll = () => {
      if (loaderRef.current) {
        const { bottom } = loaderRef.current.getBoundingClientRect();
        if (bottom <= window.innerHeight && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    const container = containerRef.current;
    container && container.addEventListener("scroll", handleScroll);
    return () => {
      container && container.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, containerRef, loaderRef, setPage]);
}

export default useInfiniteScroll;

