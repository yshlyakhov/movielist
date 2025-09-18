import { useEffect, useRef } from "react";

export const useScrollPosition = () => {
  const scrollPosition = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollPosition.current = window.pageYOffset;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition.current;
};
