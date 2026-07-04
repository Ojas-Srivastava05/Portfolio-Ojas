import { lazy, Suspense } from "react";
import { motion as Motion } from "framer-motion";
import { navItems, socialLinks, profile, INTERNSHIP_AVAILABILITY } from "../data/portfolio";
import { useLiveCodingStats } from "../context/LiveCodingStatsContext";

// Code-split: opentype.js only loads for the signature, not on first paint.
const Signature = lazy(() => import("./Signature"));

export default function Footer() {
  const { derived } = useLiveCodingStats();
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-black/30">
      <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-16 sm:px-8">
        {/* Signature centerpiece — the name appears once, as art */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-6"
        >
          <p className="label-mono">Signed off by</p>
          <div className="min-h-[6rem]">
            <Suspense fallback={null}>
              <Signature
                text="Ojas Srivastava"
                color="#34d399"
                fontSize={96}
                strokeWidth={2}
                duration={1.35}
                staggerStep={0.16}
                shimmer
                inView
                className="h-auto w-[min(460px,78vw)] [filter:drop-shadow(0_0_16px_rgba(52,211,153,0.22))]"
              />
            </Suspense>
          </div>
          <p className="max-w-xl text-[15px] leading-7 text-zinc-400">{derived.shortBio}</p>
        </Motion.div>

        <div className="hr-soft mt-12" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.9fr]">
          {/* Get in touch */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Get in touch
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/[0.06] px-3 py-1.5">
              <span className="live-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-200">
                Available for {INTERNSHIP_AVAILABILITY}
              </span>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-4 flex max-w-sm items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-zinc-200 transition hover:border-emerald-300/40 hover:bg-emerald-300/[0.05] hover:text-emerald-100"
            >
              <span className="truncate">{profile.email}</span>
              <span className="ml-3 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-emerald-200">
                →
              </span>
            </a>
          </div>

          {/* Sitemap */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Sitemap
            </p>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-sm text-zinc-300 transition hover:text-emerald-200"
                >
                  → {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Elsewhere */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Elsewhere
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {socialLinks.slice(1, 7).map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.name}
                  className="group grid h-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.02] transition hover:border-emerald-300/40 hover:bg-emerald-300/[0.06]"
                >
                  <img
                    src={social.icon}
                    alt=""
                    className="h-4 w-4 object-contain opacity-80 transition group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>React · Tailwind · Framer Motion</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>{profile.location}</span>
          </div>
          <a
            href="https://github.com/Ojas-Srivastava05/Portfolio-Ojas.git"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 transition hover:text-emerald-200"
          >
            View source ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
