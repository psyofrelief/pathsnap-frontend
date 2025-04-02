"use client";
import { useSpring } from "framer-motion";
import { useCallback, useLayoutEffect } from "react";

export function useHandleScroll() {
  const spring = useSpring(0, { damping: 57, stiffness: 900 });

  useLayoutEffect(() => {
    spring.onChange((latest) => {
      window.scrollTo(0, latest);
    });
  }, [spring]);

  return useCallback(
    (id: string) => {
      const section = document.getElementById(id);
      if (section) {
        const targetOffset = section.offsetTop;
        spring.set(window.pageYOffset, false);
        setTimeout(() => {
          spring.set(targetOffset);
        }, 0);
      }
    },
    [spring],
  );
}
