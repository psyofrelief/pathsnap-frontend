"use client";

import { useSpring } from "framer-motion";
import { useCallback, useLayoutEffect } from "react";

export function useHandleScroll(): (id: string) => void {
  const spring = useSpring(0, { damping: 57, stiffness: 900 });

  useLayoutEffect(() => {
    const unsubscribe = spring.onChange((latest: number) => {
      window.scrollTo(0, latest);
    });

    return () => {
      unsubscribe();
    };
  }, [spring]);

  return useCallback(
    (id: string) => {
      const section = document.getElementById(id);
      if (section) {
        const targetOffset = section.offsetTop;
        spring.set(window.scrollY, false);
        setTimeout(() => {
          spring.set(targetOffset);
        }, 0);
      }
    },
    [spring],
  );
}
