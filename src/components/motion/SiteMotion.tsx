"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Global scroll motion. Mounted once in the root layout.
 *
 * Five behaviours, each opted into by a data attribute:
 *
 *   data-anim="rise"    panels fade and rise, batched so a row moves as one
 *   data-anim-lines     headlines reveal line by line out of overflow masks
 *   data-anim-clip      photography wipes open from the bottom, inner image
 *                       settling from a slight overscale. This is the move
 *                       that does most of the work of looking expensive
 *   data-anim-drift     slow parallax on full bleed photography
 *   data-anim-rail      a scrubbed horizontal drift, for wide strips
 *
 * gsap.matchMedia handles prefers-reduced-motion and reverts cleanly if the
 * user flips the setting mid session. useGSAP reverts everything on route
 * change, so ScrollTriggers never accumulate across navigations.
 */
export function SiteMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      // QA escape hatch. `?nomotion` renders the settled layout with no
      // animation, so a reviewer can inspect spacing and type without waiting
      // on scroll state.
      const noMotion = new URLSearchParams(window.location.search).has(
        "nomotion",
      );

      const settle = () => {
        // No clearProps. The `.js [data-anim]` rules hide these by default, so
        // clearing inline styles would leave them invisible rather than
        // revealing them. Set the resting values explicitly.
        gsap.set("[data-anim], [data-anim-drift], [data-anim-rail]", {
          opacity: 1,
          y: 0,
          yPercent: 0,
          xPercent: 0,
          scale: 1,
        });
        gsap.set("[data-anim-clip]", { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set("[data-anim-clip] img", { scale: 1 });
      };

      if (noMotion) {
        settle();
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ---- Panels ------------------------------------------------- */
        const risers = gsap.utils.toArray<HTMLElement>('[data-anim="rise"]');

        if (risers.length) {
          gsap.set(risers, { opacity: 0, y: 44 });

          ScrollTrigger.batch(risers, {
            start: "top 88%",
            once: true,
            interval: 0.08,
            batchMax: 4,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.95,
                ease: "expo.out",
                stagger: 0.09,
                overwrite: true,
              }),
          });
        }

        /* ---- Headlines, line by line -------------------------------- */
        gsap.utils.toArray<HTMLElement>("[data-anim-lines]").forEach((group) => {
          const lines = group.querySelectorAll<HTMLElement>('[data-anim="line"]');
          if (!lines.length) return;

          gsap.set(lines, { opacity: 0, yPercent: 108 });

          gsap.to(lines, {
            opacity: 1,
            yPercent: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.11,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        /* ---- Photography, wiping open ------------------------------- */
        gsap.utils.toArray<HTMLElement>("[data-anim-clip]").forEach((frame) => {
          const img = frame.querySelector("img");

          const tl = gsap.timeline({
            scrollTrigger: { trigger: frame, start: "top 84%", once: true },
          });

          tl.fromTo(
            frame,
            { clipPath: "inset(14% 8% 14% 8% round 22px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 22px)",
              duration: 1.35,
              ease: "expo.out",
            },
          );

          if (img) {
            // Settling out of an overscale is what stops the wipe reading as a
            // plain mask. The two run together, not in sequence.
            tl.fromTo(
              img,
              { scale: 1.18 },
              { scale: 1, duration: 1.6, ease: "expo.out" },
              0,
            );
          }
        });

        /* ---- Full bleed parallax ------------------------------------ */
        gsap.utils.toArray<HTMLElement>("[data-anim-drift]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });

        /* ---- Wide strips, drifting sideways on scrub ---------------- */
        gsap.utils.toArray<HTMLElement>("[data-anim-rail]").forEach((el) => {
          gsap.fromTo(
            el,
            { xPercent: -3 },
            {
              xPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        });

        // Fonts and images change layout after first paint.
        const refresh = () => ScrollTrigger.refresh();
        if (document.fonts?.ready) void document.fonts.ready.then(refresh);
        window.addEventListener("load", refresh);

        return () => window.removeEventListener("load", refresh);
      });

      mm.add("(prefers-reduced-motion: reduce)", settle);

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
