"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { nav, site } from "@/content/site";

/**
 * A bone pill floating on the clay ground, from the reference.
 *
 * Navigation stays visible on desktop. No hamburger above 768px, which is a
 * hard constraint from the reader's age rather than a preference. Below that
 * the menu is a click toggle, never a hover target.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile panel on navigation. Adjusting state during render is the
  // documented React pattern for this, and unlike an effect it takes hold in
  // the same commit rather than a frame later.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 px-[14px] pt-[14px] pb-[14px] sm:px-[18px] sm:pt-[18px]">
      <div className="panel rounded-[var(--radius-pill)]">
        <div className="flex items-center gap-4 py-2 pr-2 pl-5 sm:pl-6">
          <Link
            href="/"
            className="shrink-0 text-espresso"
            aria-label={`${site.name}, home`}
          >
            <Logo size="sm" markClassName="text-clay" />
          </Link>

          <nav
            aria-label="Main"
            className="mx-auto hidden items-center gap-0.5 md:flex"
          >
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    // 44px, the WCAG target-size floor. The 48px in the brief
                    // is for buttons and calls to action, not nav links, and
                    // at 48 the bar reads oversized.
                    "inline-flex min-h-[44px] items-center rounded-full px-3.5 text-[1rem] font-semibold transition-colors",
                    active
                      ? "bg-clay text-bone"
                      : "text-espresso hover:bg-espresso/8",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/club"
            className="btn btn-clay ml-auto hidden !min-h-[44px] !gap-2 !py-2 !pr-2 !pl-4.5 text-[1rem] md:ml-0 lg:inline-flex"
          >
            <span>Join the waitlist</span>
            <span className="btn-badge !h-7 !w-7" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
                <path
                  d="M3.5 11.5 11.5 3.5M11.5 3.5H5.2M11.5 3.5v6.3"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="btn btn-espresso ml-auto !min-h-[44px] !px-5 text-[1rem] md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="border-t border-espresso/12 px-3 pt-2 pb-3 md:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "flex min-h-[54px] items-center rounded-2xl px-4 text-base font-semibold",
                        active ? "bg-clay text-bone" : "text-espresso",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/club"
              className="btn btn-clay mt-2 w-full justify-center"
            >
              Join the waitlist
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
