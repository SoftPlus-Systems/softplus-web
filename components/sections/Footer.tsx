import { Wordmark } from "@/components/PlusLogo";
import { contact, footerNav } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-surface-line bg-ink-950 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a
              href="#top"
              aria-label="Soft Plus Systems — back to top"
              className="inline-flex items-center py-1 text-bone"
            >
              <Wordmark className="h-11" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
              Custom software for businesses that run on precision — ERP, accounting, stock,
              POS, mobile and web, engineered as one connected system.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wide-2 text-signal">Solutions</h4>
            <ul className="mt-3 flex flex-col">
              {footerNav.solutions.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    data-cursor="link"
                    className="block py-3 text-sm text-mist transition-colors duration-300 hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wide-2 text-signal">Company</h4>
            <ul className="mt-3 flex flex-col">
              {footerNav.company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    data-cursor="link"
                    className="block py-3 text-sm text-mist transition-colors duration-300 hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wide-2 text-signal">Connect</h4>
            <ul className="mt-3 flex flex-col">
              {footerNav.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="block py-3 text-sm text-mist transition-colors duration-300 hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${contact.email}`}
              data-cursor="link"
              className="mt-3 inline-block py-3 text-sm text-mist transition-colors duration-300 hover:text-bone"
            >
              Email us
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-surface-line py-8 font-mono text-xs uppercase tracking-wide-2 text-mist sm:flex-row">
          <span>© {new Date().getFullYear()} Soft Plus Systems. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            Systems operational
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="select-none overflow-hidden whitespace-nowrap pb-4 text-center font-display font-semibold leading-none text-transparent"
        style={{
          WebkitTextStroke: "1px rgba(243,244,239,0.06)",
          fontSize: "clamp(3rem, 10vw, 7.5rem)",
        }}
      >
        Soft+Systems
      </div>
    </footer>
  );
}
