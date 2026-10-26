"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps server-rendered FAQ <details> items and opens the one named by the URL hash.
 * The lookup is scoped to this wrapper, because hidden (Activity-preserved) routes can
 * contain <details> with the same id.
 */
export function FaqHashOpener({ className, children }: { className?: string; children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const openFromHash = () => {
      const root = rootRef.current;
      if (!root) return;
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (!id) return;
      const el = root.querySelector<HTMLDetailsElement>(`details[id='${CSS.escape(id)}']`);
      if (!el) return;
      const visible = typeof root.checkVisibility === "function" ? root.checkVisibility() : root.offsetParent !== null;
      if (!visible) return;
      el.open = true;
      el.scrollIntoView({ block: "start" });
    };

    const frames = new Set<number>();
    const schedule = () => {
      const handle = requestAnimationFrame(() => {
        frames.delete(handle);
        openFromHash();
      });
      frames.add(handle);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.pathname !== window.location.pathname || anchor.hash.length <= 1) return;
      schedule();
    };

    schedule();
    window.addEventListener("hashchange", openFromHash);
    window.addEventListener("popstate", schedule);
    document.addEventListener("click", onClick, true);
    return () => {
      frames.forEach((handle) => cancelAnimationFrame(handle));
      window.removeEventListener("hashchange", openFromHash);
      window.removeEventListener("popstate", schedule);
      document.removeEventListener("click", onClick, true);
    };
  }, [pathname]);

  return (
    <div className={className} ref={rootRef}>
      {children}
    </div>
  );
}
