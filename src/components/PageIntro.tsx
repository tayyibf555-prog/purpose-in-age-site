import Image from "next/image";
import type { ReactNode } from "react";

/**
 * The opening section on every route other than home.
 *
 * Two variants from one component:
 *
 *   no image  a bone panel, dark type on light
 *   image     a single photographic hero with the type laid over it
 *
 * The image variant is one section, not a title panel stacked on a picture.
 * Text still never sits on unmediated photography: a left-to-right ramp plus
 * a bottom lift carries the contrast, exactly as the home hero does.
 *
 * `cut` takes the trailing phrase of the headline and sets it in the italic,
 * which is the one typographic move that carries across the site. Keep it to a
 * short phrase; it stops working as a full sentence.
 *
 * There is no eyebrow label. The tracked dot-labels that used to sit above
 * every headline were removed site wide: they repeated what the headline
 * already said and made the page feel busier than it is.
 */
export function PageIntro({
  headline,
  cut,
  lead,
  image,
  children,
}: {
  headline: string;
  cut?: string;
  lead?: string;
  image?: { src: string; alt: string };
  children?: ReactNode;
}) {
  if (image) {
    return (
      <section className="relative isolate min-h-[62svh] overflow-hidden rounded-[var(--radius-panel)] md:min-h-[74svh]">
        <div className="absolute inset-[-7%]" data-anim-drift>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-espresso/88 from-5% via-espresso/50 via-50% to-espresso/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-espresso/80 to-transparent"
        />

        <div className="relative flex min-h-[62svh] flex-col justify-end p-6 pb-14 sm:p-10 md:min-h-[74svh] md:p-14 md:pb-20">

          <h1 className="max-w-[19ch] text-4xl" data-anim-lines>
            <span className="line-mask">
              <span className="block" data-anim="line">
                {headline}
              </span>
            </span>
            {cut && (
              <span className="line-mask">
                <span className="cut block text-sand" data-anim="line">
                  {cut}
                </span>
              </span>
            )}
          </h1>

          {lead && (
            <p className="measure mt-8 text-xl text-bone">{lead}</p>
          )}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      className="panel panel-pad pt-16 sm:pt-20 md:pt-28"
      data-anim="rise"
    >
      <h1 className="max-w-[19ch] text-4xl">
        {headline} {cut && <span className="cut text-clay">{cut}</span>}
      </h1>
      {lead && (
        <p className="measure mt-8 text-xl text-espresso sm:text-2xl">{lead}</p>
      )}
      {children}
    </section>
  );
}
