"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/data/site";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  // The menu is open only for the pathname it was opened on, so any route
  // change (link, back/forward, programmatic) closes it on the same render.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const close = () => setOpenFor(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenFor(null);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" onClick={close} aria-label="PlacementSaathi home" className="rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active ? "text-brand-700" : "text-slate-600 hover:text-brand-900"
                    }`}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 w-4 rounded-full bg-brand-600" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#search" className="hidden h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 sm:inline-flex" aria-label="Search">
            <Icon name="search" />
          </Link>
          <Link href="/roadmap" className="btn btn-primary hidden min-h-10 py-2 text-sm sm:inline-flex">
            Start Preparing
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-brand-900 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenFor(open ? null : pathname)}
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav id="mobile-menu" aria-label="Mobile" hidden={!open} className="border-t border-slate-200 bg-white xl:hidden">
        <ul className="container-page grid gap-1 py-3 sm:grid-cols-2">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-base font-medium ${
                    active ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="grid grid-cols-2 gap-2 pt-2 sm:col-span-2">
            <Link href="/about" onClick={close} className="btn btn-secondary">About</Link>
            <Link href="/contact" onClick={close} className="btn btn-secondary">Contact</Link>
          </li>
          <li className="sm:col-span-2">
            <Link href="/roadmap" onClick={close} className="btn btn-primary w-full">Start Preparing</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
