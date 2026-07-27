import type { ReactNode } from "react";

export type PanelTone = "bone" | "dark" | "clay";

const toneClass: Record<PanelTone, string> = {
  bone: "panel",
  dark: "panel panel-dark",
  clay: "panel panel-clay",
};

/**
 * A bone (or dark, or recessed clay) panel floating on the clay ground.
 *
 * `notch` bites a concave circle out of one corner so a pill can nest into
 * the cut, which is the signature device from the reference. Use `PanelNotch`
 * for the element that sits in the bite.
 */
export function Panel({
  tone = "bone",
  notch,
  padded = true,
  animate = true,
  className = "",
  children,
  id,
  as: Tag = "section",
}: {
  tone?: PanelTone;
  notch?: "br" | "bl" | "tr";
  padded?: boolean;
  animate?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
  as?: "section" | "div" | "article" | "aside";
}) {
  const classes = [
    toneClass[tone],
    notch ? `notch-${notch}` : "",
    padded ? "panel-pad" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag id={id} className={classes} data-anim={animate ? "rise" : undefined}>
      {children}
    </Tag>
  );
}

/**
 * Wrapper that positions a pill inside a panel's notch. Sits outside the
 * masked panel, because a mask would clip it.
 */
export function PanelNotch({
  corner = "br",
  children,
  className = "",
}: {
  corner?: "br" | "tr";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`in-notch-${corner} ${className}`}>{children}</div>
  );
}

/** A label with a leading dot, from the reference. */
export function Label({
  children,
  caps = false,
  className = "",
}: {
  children: ReactNode;
  caps?: boolean;
  className?: string;
}) {
  return (
    <p className={`label ${caps ? "label-caps" : ""} ${className}`}>
      {children}
    </p>
  );
}
