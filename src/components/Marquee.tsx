"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Person = { name: string; role: string; href: string };

/**
 * A slow, continuous name strip. Two rows travelling in opposite directions.
 *
 * The list is rendered twice and the track is moved to -50%, so the seam never
 * shows. Speed is deliberately low: this reader is 55 to 80 and the names have
 * to stay readable, so it reads as drift rather than as a ticker.
 *
 * It pauses on hover and on keyboard focus, which is what makes the links
 * usable rather than a moving target. Nothing is hidden behind that hover, so
 * it stays inside the "no hover dependent content" rule.
 *
 * Under reduced motion the animation never starts and the strip becomes a
 * plain, statically laid out row.
 */
export function Marquee({
  people,
  reverse = false,
  speed = 62,
}: {
  people: readonly Person[];
  reverse?: boolean;
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = scope.current?.querySelector<HTMLElement>("[data-track]");
        if (!track) return;

        gsap.set(track, { xPercent: reverse ? -50 : 0 });

        tween.current = gsap.to(track, {
          xPercent: reverse ? 0 : -50,
          duration: speed,
          ease: "none",
          repeat: -1,
        });

        return () => {
          tween.current?.kill();
          tween.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope, dependencies: [reverse, speed] },
  );

  const hold = (on: boolean) => {
    setPaused(on);
    if (on) tween.current?.pause();
    else tween.current?.play();
  };

  const doubled = [...people, ...people];

  return (
    <div
      ref={scope}
      className="relative overflow-hidden py-1"
      onMouseEnter={() => hold(true)}
      onMouseLeave={() => hold(false)}
      onFocusCapture={() => hold(true)}
      onBlurCapture={() => hold(false)}
    >
      {/* Soft edges so names enter and leave rather than being chopped. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-espresso to-transparent sm:w-32"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-espresso to-transparent sm:w-32"
      />

      <ul data-track className="flex w-max items-center gap-4 sm:gap-6">
        {doubled.map((person, index) => (
          <li key={`${person.href}-${index}`}>
            <a
              href={person.href}
              target="_blank"
              rel="noopener noreferrer"
              // The duplicated half is decorative; hide it from assistive tech
              // so every name is announced exactly once.
              aria-hidden={index >= people.length ? "true" : undefined}
              tabIndex={index >= people.length ? -1 : undefined}
              className="group flex items-baseline gap-3 rounded-full border border-bone/20 px-6 py-4 whitespace-nowrap transition-colors hover:border-sand hover:bg-bone/5"
            >
              <span className="font-display text-xl font-extrabold tracking-[-0.02em] text-bone">
                {person.name}
              </span>
              <span className="text-sm text-sand">{person.role}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="sr-only" aria-live="polite">
        {paused ? "Name strip paused" : ""}
      </p>
    </div>
  );
}
