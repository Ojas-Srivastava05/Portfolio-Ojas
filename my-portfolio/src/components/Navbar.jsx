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
      const scrollPosition = window.scrollY + 140;
      const current = [...navItems].reverse().find((item) => {
        const section = document.getElementById(item.id);
        return section && section.offsetTop <= scrollPosition;
      });
      if (current) setActiveSection(current.id);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileOpen(false);
  };

  return (
    <Motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav
        className={`mx-auto flex max-w-[1240px] items-center justify-between rounded-xl border px-3 py-2.5 transition duration-500 ${
          isScrolled
            ? "border-white/[0.08] bg-[rgba(8,9,12,0.78)] shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-white/[0.05] bg-[rgba(8,9,12,0.32)] backdrop-blur-md"
        }`}
      >
        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="group flex items-center gap-3 px-2 text-left"
          aria-label="Go to home"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-md border border-emerald-300/30 bg-emerald-300/[0.08] font-mono text-[13px] font-bold tracking-wider text-emerald-200">
            <span className="relative">OS</span>
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-[14px] font-semibold text-white">{profile.name}</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {profile.role}
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`relative rounded-md px-3 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.14em] transition ${
                activeSection === item.id
                  ? "text-emerald-200"
                  : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {activeSection === item.id && (
                <Motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-md border border-emerald-300/30 bg-emerald-300/[0.07]"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Right cluster */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            aria-label="Open command palette"
            className="group flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.04] hover:text-emerald-200"
            title="Open command palette"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <kbd className="rounded border border-white/[0.08] bg-black/30 px-1 py-0.5 text-[9px] text-zinc-300">
              {isMac ? "⌘" : "Ctrl"}
            </kbd>
            <kbd className="rounded border border-white/[0.08] bg-black/30 px-1 py-0.5 text-[9px] text-zinc-300">
              K
            </kbd>
          </button>
          <a
            href={profile.resume}
            download
            className="rounded-md border border-white/[0.10] px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-200 transition hover:border-amber-300/50 hover:text-amber-100"
          >
            Resume.pdf
          </a>
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="rounded-md border border-emerald-300/40 bg-emerald-300 px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-emerald-200"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-md border border-white/[0.10] text-zinc-200 transition hover:border-emerald-300/50 hover:text-emerald-100 lg:hidden"
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
            className="mx-auto mt-2 max-w-[1240px] rounded-xl border border-white/[0.08] bg-[rgba(8,9,12,0.96)] p-2 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between rounded-md px-3 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition ${
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
                className="flex items-center justify-between rounded-md px-3 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-amber-200"
              >
                <span>Resume.pdf</span>
                <span>↓</span>
              </a>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.header>
  );
};

export default Navbar;
