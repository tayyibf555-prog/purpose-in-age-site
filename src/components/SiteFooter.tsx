import Link from "next/link";
import { EmailCapture } from "./EmailCapture";
import { LogoStacked } from "./Logo";
import { footer, nav, site, social } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="panel panel-clay panel-pad" data-anim="rise">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <h2 className="text-3xl">
            Get the writing{" "}
            <span className="cut text-sand">by email</span>
          </h2>
          <p className="measure mt-6 text-lg text-bone/90">
            {footer.capture.note}
          </p>
          <div className="mt-9">
            <EmailCapture
              intent="newsletter"
              label="Your email address"
              button={footer.capture.button}
            />
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {/* aria-label carries what the visible eyebrow used to. */}
          <nav aria-label="Pages">
            <ul className="flex flex-col gap-0.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-base text-bone hover:text-sand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <ul className="flex flex-col gap-0.5">
              {social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-base text-bone hover:text-sand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {footer.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-base text-bone hover:text-sand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="mt-16 grid gap-12 border-t border-bone/20 pt-12 lg:grid-cols-[auto_1fr] lg:gap-20">
        <LogoStacked
          markClassName="text-sand"
          tagClassName="text-sand"
          ruleClassName="bg-bone"
          className="text-bone"
        />
        <div>
          <p className="measure text-sm text-bone/85">{footer.disclaimer}</p>
          <p className="mt-4 text-sm text-bone/85">
            &copy; {new Date().getFullYear()} {site.author}. {site.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
