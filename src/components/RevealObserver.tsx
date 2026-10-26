"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades in .reveal elements as they reach the screen.
 * Anything already above the bottom of the screen is revealed too, so jumping to an
 * anchor (e.g. /#study-plan) or a fast fling on a phone never leaves content hidden.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let pending = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    let frame = 0;

    const check = () => {
      frame = 0;
      const limit = window.innerHeight * 0.95;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add("is-visible");
          return false;
        }
        return true;
      });
      if (pending.length === 0) stop();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    document.documentElement.classList.add("reveal-ready");
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      stop();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
