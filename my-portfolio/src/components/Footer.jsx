import { motion as Motion } from "framer-motion";
import { navItems, socialLinks, profile, INTERNSHIP_AVAILABILITY } from "../data/portfolio";
import { useLiveCodingStats } from "../context/LiveCodingStatsContext";

export default function Footer() {
  const { derived } = useLiveCodingStats();
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-black/30">
      {/* Big signature wordmark */}
      <div className="mx-auto max-w-[1240px] px-5 pt-16 sm:px-8">
        <Motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl leading-[0.9] tracking-ultratight text-white/[0.04] sm:text-8xl md:text-[8rem] lg:text-[10rem]"
        >
          Ojas <span className="italic text-emerald-200/[0.08]">Srivastava.</span>
        </Motion.h2>
      </div>

      <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-10 sm:px-8">
        <div className="hr-soft" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
          {/* Identity column */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Maintained by
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">
              {profile.name}
            </p>
            <p className="mt-2 max-w-md text-sm leading-7 text-zinc-400">
              {derived.shortBio}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-emerald-300/25 bg-emerald-300/[0.06] px-3 py-1.5">
              <span className="live-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-200">
                Available for {INTERNSHIP_AVAILABILITY}
              </span>
            </div>
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

          {/* Channels */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Channels
            </p>
            <div className="mt-4 grid gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center justify-between rounded-md border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-sm text-zinc-200 transition hover:border-emerald-300/40 hover:bg-emerald-300/[0.05] hover:text-emerald-100"
              >
                <span className="truncate">{profile.email}</span>
                <span className="text-zinc-500 transition group-hover:text-emerald-200">↗</span>
              </a>
              <div className="grid grid-cols-3 gap-2">
                {socialLinks.slice(1, 7).map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.name}
                    className="group grid h-11 place-items-center rounded-md border border-white/[0.08] bg-white/[0.02] transition hover:border-emerald-300/40 hover:bg-emerald-300/[0.06]"
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
        </div>

        {/* Bottom strip */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            <span>© {new Date().getFullYear()} OJAS SRIVASTAVA</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>BUILT WITH REACT · TAILWIND · FRAMER MOTION</span>
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
