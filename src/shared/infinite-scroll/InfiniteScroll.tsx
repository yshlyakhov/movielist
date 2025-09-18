import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  loading: boolean;
  onLoadMore: () => void;
}

const InfiniteScroll = ({ children, loading, onLoadMore }: Props) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          // Trigger fetch more data when target is visible and not already loading
          onLoadMore();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the target is visible
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
      observer.disconnect();
    };
  }, [loading, onLoadMore]);

  return (
    <>
      <div>{children}</div>
      {loading && <p className="loading">Loading more items...</p>}
      <div ref={observerTarget} style={{ height: "200px" }}></div>
    </>
  );
};

export default InfiniteScroll;
