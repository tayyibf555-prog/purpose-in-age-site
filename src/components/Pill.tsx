import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "bone" | "espresso" | "clay" | "sand";

/**
 * The pill button from the reference, with a circular badge riding on the end.
 *
 * Solid fills only. There are no ghost or outline buttons in this system, and
 * the 52px floor (62px at large) comes from the reader being 55 to 80.
 */
export function Pill({
  href,
  children,
  variant = "bone",
  size = "md",
  className = "",
  badge = true,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  badge?: boolean;
}) {
  const classes = [
    "btn",
    size === "lg" ? "btn-lg" : "",
    `btn-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes}>
      <span>{children}</span>
      {badge && (
        <span className="btn-badge" aria-hidden="true">
          <Arrow />
        </span>
      )}
    </Link>
  );
}

/** Same shape, for form submits. */
export function PillButton({
  children,
  variant = "sand",
  size = "md",
  className = "",
  disabled,
  type = "submit",
}: {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "submit" | "button";
}) {
  const classes = [
    "btn",
    size === "lg" ? "btn-lg" : "",
    `btn-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} disabled={disabled} className={classes}>
      <span>{children}</span>
      <span className="btn-badge" aria-hidden="true">
        <Arrow />
      </span>
    </button>
  );
}

function Arrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 11.5 11.5 3.5M11.5 3.5H5.2M11.5 3.5v6.3"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
