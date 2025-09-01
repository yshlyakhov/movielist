import { useEffect, useRef } from "react";

export const useRendersCount = (component: string) => {
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current++;
    console.log(
      `${component} rendered %c${countRef.current} times`,
      `color: orange;`
    );
  });

  return countRef.current;
};
