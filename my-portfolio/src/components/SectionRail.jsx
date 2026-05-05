import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { navItems } from "../data/portfolio";

export default function SectionRail() {
  const [activeId, setActiveId] = useState(navItems[0].id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleEntry) setActiveId(visibleEntry.target.id);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.2, 0.5, 0.8],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Motion.nav
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Section progress"
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
    >
      <ul className={`pointer-events-auto flex flex-col gap-3 ${visible ? "" : "pointer-events-none"}`}>
        {navItems.map((n, i) => {
          const isActive = activeId === n.id;
          return (
            <li key={n.id} className="group relative flex items-center justify-end">
              <Motion.span
                aria-hidden="true"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : 6,
                }}
                transition={{ duration: 0.25 }}
                className="mr-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-200/80"
              >
                {String(i + 1).padStart(2, "0")} · {n.name}
              </Motion.span>
              <button
                type="button"
                aria-label={`Go to ${n.name}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => handleClick(n.id)}
                className="relative grid h-6 w-6 place-items-center"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-2.5 w-2.5 bg-emerald-300 shadow-[0_0_0_4px_rgba(52,211,153,0.18)]"
                      : "h-1.5 w-1.5 bg-white/20 group-hover:bg-emerald-300/60"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </Motion.nav>
  );
}
