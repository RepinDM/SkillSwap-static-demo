import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({
                                    hasMore,
                                    isLoading,
                                    onLoadMore,
                                  }: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onLoadMore();
          }
        },
        { threshold: 0.1 }
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, onLoadMore]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return { lastElementRef };
};