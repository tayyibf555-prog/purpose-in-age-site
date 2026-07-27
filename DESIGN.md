# DESIGN.md

The visual system for Purpose in Age. Authoritative. Implemented in `src/app/globals.css`.

## Where this comes from

Adapted from the Orix Creative "Building Beyond" reference the client selected, out of a set that also included Quad, EverGreen, Stayli and Flowform.

The three things taken from it:

1. **A deep clay ground carrying the entire page.** Not a neutral page with an accent. The colour is the surface.
2. **Bone panels floating on that ground**, with a pill notched into a corner.
3. **A heavy grotesque broken by one Didone italic phrase.** "Building *Beyond*" becomes "Your career ended. *You didn't.*"

Legibility floors (20px body, 48px targets, always-visible desktop nav, no hover-dependent content) are kept from the business brief, because they come from the reader being 55 to 80 rather than from any particular visual system. The reference sites all use 13px grey body copy and ghost buttons, and none of that survives contact with this audience.

## Color

Committed strategy. Clay is not an accent, it is the page.

| Token | Hex | Role |
|---|---|---|
| `--color-clay` | `#5C2A20` | the page ground, everywhere |
| `--color-clay-deep` | `#431D16` | recessed panels, footer |
| `--color-clay-soft` | `#6D372B` | hairlines and hover states on clay |
| `--color-bone` | `#F3EFE8` | panels, text on dark grounds |
| `--color-bone-dim` | `#E3DDD2` | secondary panel fills |
| `--color-espresso` | `#1E1713` | text on bone, dark panels |
| `--color-espresso-soft` | `#4A3C34` | secondary text on bone only |
| `--color-sand` | `#D8B78C` | accent, on clay or espresso only, never on bone |

Rules:

- **Sand is rationed to email capture and section labels.** Sand on bone is banned outright; it is a light-on-light pairing and fails.
- **`--color-espresso-soft` is for meta and captions on bone only.** It is not a body colour. Body copy on a panel is full-strength espresso. There is no grey body text anywhere in this build.
- **No pure black, no pure white.** Every neutral is tinted toward the clay hue.
- Text never sits on unmediated photography. Either a solid panel or a scrim.

Measured contrast, computed rather than estimated. Every shipped text pairing clears AA and most clear AAA:

| Pairing | Ratio | Grade |
|---|---|---|
| `--espresso` on `--bone` | 15.43:1 | AAA |
| `--bone` on `--espresso` | 15.43:1 | AAA |
| `--bone` on `--clay-deep` | 12.85:1 | AAA |
| `--bone` on `--clay` | 10.14:1 | AAA |
| `--clay` on `--bone` | 10.14:1 | AAA |
| `--sand` on `--espresso` | 9.33:1 | AAA |
| `--espresso` on `--sand` | 9.33:1 | AAA |
| `--espresso-soft` on `--bone` | 9.22:1 | AAA |
| `--bone-dim` on `--clay` | 8.60:1 | AAA |
| `--bone` on `--clay-soft` | 8.21:1 | AAA |
| `--sand` on `--clay-deep` | 7.76:1 | AAA |
| `--sand` on `--clay` | 6.13:1 | AA |

Sand on clay at 6.13 is the weakest pairing and is used only for 15px semibold labels, well clear of the 4.5 threshold.

## Typography

Two families, doing genuinely different jobs.

**Archivo** carries display and body. A wide grotesque with square terminals that reads as built rather than styled, and stays exceptionally legible at 20px, which matters more here than novelty.

**Bodoni Moda italic** is the cut. High-contrast Didone, used one phrase at a time, always as the closing clause of a headline. It is the single move that ties every page together. Applied with `.cut`, which also bumps size 1.1× because a Didone italic sits optically small beside a heavy grotesque.

Never use the italic for a full sentence. It stops working past about six words.

Scale ratio roughly 1.333, fluid via `clamp()`.

| Step | Size | Use |
|---|---|---|
| `--text-display` | clamp(3.1rem, 7.4vw, 8.2rem) | hero headline only |
| `--text-4xl` | clamp(2.6rem, 4.6vw, 4.6rem) | panel headlines |
| `--text-3xl` | clamp(2rem, 3.1vw, 3.2rem) | sub headlines |
| `--text-2xl` | clamp(1.6rem, 2.2vw, 2.1rem) | large body, standfirsts |
| `--text-xl` | 24px | lead paragraphs |
| `--text-lg` | 22px | comfortable body |
| `--text-base` | 20px | **body floor, never smaller** |
| `--text-sm` | 17px | captions, meta |
| `--text-label` | 15px | dot labels only |

Nothing renders below 15px. Display line-height is exactly 1, not lower, because the headline reveal masks each line with `overflow: hidden` and sub-1 leading clips cap heights and descenders. Tightness comes from the negative margin on `.line-mask`, not from the leading.

## Panels and the notch

Panels are the only container. They never nest.

- Radius 34px. Page gutter 18px (14px below 640px).
- Three tones: `bone` (default), `dark` (espresso), `clay` (clay-deep, recessed).

**The notch** is the signature device: a pill that appears cut into a panel corner.

The obvious implementation, a `radial-gradient` mask biting a circle out of the corner, is wrong. A circle large enough to clear a 230px pill swallows the whole corner, and an ellipse cannot follow a rounded rectangle. It also strips the panel's shadow.

Instead the pill carries a **halo of the ground colour**. The cut traces the pill exactly, stays correct at any label length, and leaves the panel untouched. The halo is a sibling of the panel, not a child, so `--notch-ground` and `--notch-gap` are declared on `.in-notch-*` rather than on `.notch-*`; declaring them on the panel leaves them unresolved and the halo collapses silently.

`.notch-br` reserves bottom padding so panel content never collides with the nested pill.

## Buttons

- 52px minimum, 62px at large. Solid fills only. **No ghost or outline buttons exist in this system.**
- Verb-first labels. "Join the waitlist", not "Waitlist".
- Every pill carries a circular badge with a diagonal arrow, which nudges on hover. Decoration only, `aria-hidden`.
- Sand fill is reserved for email capture. That is what makes it mean something.

## Rhythm

The page is a stack of rounded panels, and an unbroken run of them reads as monotonous however good each one is. Two correctives:

- **`.bleed`** breaks out of the gutter and drops the radius to zero, so a section can go wall to wall with square edges. Used once, on the network strip. Used more than twice it stops being a break.
- **Section shape must vary, not just section colour.** A bare statement with no panel, a horizontal fact strip, a featured-plus-grid, a ruled editorial list, an overlapping panel. Nine sections that are all a two-column headline-and-body panel read as one idea repeated nine times, regardless of how the materials alternate.

## Motion

GSAP with ScrollTrigger, via `useGSAP` so everything reverts on route change and ScrollTriggers never accumulate.

- **Photography wipes open.** The frame animates from `inset(14% 8% ...)` to flush while the image inside settles from a 1.18 overscale, both on `expo.out`, running together rather than in sequence. This is the move that does most of the work of looking expensive. A mask on its own just reads as a fade.
- **Panels** fade and rise 44px once, batched via `ScrollTrigger.batch` so a row staggers as one movement instead of firing independently.
- **Headlines** reveal line by line out of `overflow: hidden` masks, `expo.out`, 0.11s stagger.
- **Photography** drifts ±4% on a scrub; wide strips drift ±3% horizontally.
- **The name marquee** runs on a linear infinite tween, deliberately slow. It pauses on hover *and* on keyboard focus, because otherwise the links are a moving target for a 66-year-old. The duplicated half is `aria-hidden` and `tabIndex={-1}` so each name is announced and tabbed to exactly once.
- No counters, no cursor following, no scroll hijack. Pinned horizontal scroll was considered for the network strip and rejected: capturing the scroll is disorienting for this reader.

## Portraiture

Scott's portrait is a **transparent circular cutout** on a clay field, not a rectangular crop. It was produced by upscaling his own photograph to 4K and removing the background, never by generating a face. A synthesised likeness on a site whose entire product is one man's credibility is a liability, and that rule holds even when the result would look better.

Containers use `aspect-square` and `object-contain`. `object-cover` clips the circle.

Two escape hatches:

- `prefers-reduced-motion: reduce` is handled by `gsap.matchMedia` **and** in CSS, so it holds if the user flips the setting mid-session.
- `?nomotion` renders the settled layout with no animation, for reviewing spacing and type without waiting on scroll state.

Both branches set resting values **explicitly** and never use `clearProps`. The `.js [data-anim]` rule hides these elements by default, so clearing inline styles leaves them invisible rather than revealing them. That bug cost an hour; do not reintroduce it.

Content ships visible. The `js` class is added by an inline script before paint and is the only thing that permits hiding, so a JavaScript failure degrades to a fully readable page rather than a blank one.

## Accessibility floor

Non-negotiable, set by the reader rather than by policy.

- Body 20px minimum, labels 15px minimum. Never grey body text.
- Buttons 52px minimum, solid, verb-first.
- No hover-dependent content anywhere.
- Desktop navigation always visible. No hamburger above 768px.
- Text never sits directly on unmediated photography.
- Form status is announced via `role="status"`, never signalled by colour alone.
- Focus visible on every interactive element, 3px offset, never removed.
