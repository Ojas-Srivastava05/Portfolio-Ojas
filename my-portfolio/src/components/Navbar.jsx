import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { navItems, profile } from "../data/portfolio";

const isMac =
  typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      // Detection line just below the navbar; the last section whose top has
      // crossed it is the active one (robust against varying section heights).
      const line = 160;
      let current = navItems[0].id;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    // Highlight immediately so the click always reflects the target.
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileOpen(false);
  };

  return (
    <Motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-4 sm:px-6"
    >
      <nav
        className={`mx-auto flex h-14 max-w-[1160px] items-center justify-between gap-2 rounded-full pl-2.5 pr-2.5 transition-all duration-500 ${
          isScrolled
            ? "border border-white/[0.08] bg-[rgba(10,11,14,0.72)] shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
            : "border border-white/[0.05] bg-[rgba(10,11,14,0.28)] backdrop-blur-xl"
        }`}
      >
        {/* Brand — name, written elegantly with the site's shiny accent */}
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="group shrink-0 rounded-full px-2.5 py-1 text-left transition hover:bg-white/[0.03]"
          aria-label="Go to home"
        >
          <span className="shiny-text animate-shiny whitespace-nowrap font-display text-[19px] italic leading-none tracking-tight sm:text-[21px]">
            {profile.name}
          </span>
        </button>

        {/* Desktop nav — sliding capsule */}
        <div className="hidden items-center lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`relative rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors ${
                activeSection === item.id
                  ? "text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {activeSection === item.id && (
                <Motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Right cluster — minimal */}
        <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            aria-label="Open command palette"
            title={`Search — ${isMac ? "⌘" : "Ctrl"} K`}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-400 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.05] hover:text-emerald-200"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
          <a
            href={profile.resume}
            download
            className="rounded-full px-3.5 py-2 text-[12.5px] font-medium text-zinc-300 transition hover:text-white"
          >
            Résumé
          </a>
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="group inline-flex items-center gap-1.5 rounded-full bg-emerald-300 px-4 py-2 text-[12.5px] font-semibold text-ink transition-all hover:bg-emerald-200 active:scale-[0.98]"
          >
            Hire me
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.10] text-zinc-200 transition hover:border-emerald-300/50 hover:text-emerald-100 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isMobileOpen}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${
                isMobileOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-0.5 w-5 rounded-full bg-current transition ${
                isMobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition ${
                isMobileOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-2 max-w-[1160px] rounded-2xl border border-white/[0.08] bg-[rgba(10,11,14,0.96)] p-2 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium transition ${
                    activeSection === item.id
                      ? "bg-emerald-300/[0.08] text-emerald-200"
                      : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-zinc-600">→</span>
                </button>
              ))}
              <div className="my-2 h-px bg-white/[0.06]" />
              <a
                href={profile.resume}
                download
                className="flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium text-zinc-200"
              >
                <span>Résumé</span>
                <span>↓</span>
              </a>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="flex items-center justify-between rounded-xl bg-emerald-300 px-4 py-3 text-[14px] font-semibold text-ink"
              >
                <span>Hire me</span>
                <span>→</span>
              </button>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.header>
  );
};

export default Navbar;
