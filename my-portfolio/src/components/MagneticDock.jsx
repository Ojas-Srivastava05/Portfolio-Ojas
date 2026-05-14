/**
 * MagneticDock — macOS-style dock that magnifies icons as the cursor approaches.
 * Social links float at the bottom center. Desktop only (pointer:fine).
 */
import { useRef, useState, useEffect } from "react";
import { motion as Motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { socialLinks } from "../data/portfolio";

// Force white icons so all logos are visible on the dark dock background.
const DOCK_ITEMS = socialLinks.slice(0, 5).map((s) => ({
  ...s,
  label: s.name,
  icon: s.icon.replace(/\/[0-9A-Fa-f]{6}$/, "/FFFFFF"),
}));

const DOCK_MEDIA_QUERY =
  "(min-width: 1024px) and (pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)";

function DockItem({ item, mouseX }) {
  const ref = useRef(null);
  const [tooltip, setTooltip] = useState(false);

  const distance = useMotionValue(Infinity);

  useEffect(() => {
    return mouseX.on("change", (latest) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      distance.set(Math.abs(latest - center));
    });
  }, [mouseX, distance]);

  const size = useTransform(distance, [0, 80, 160], [68, 50, 38]);
  const sizeSpring = useSpring(size, { stiffness: 300, damping: 22, mass: 0.5 });

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      {tooltip && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/[0.10] bg-[rgba(8,9,12,0.92)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-200 shadow-xl backdrop-blur">
          {item.label}
        </div>
      )}
      <Motion.a
        ref={ref}
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        style={{ width: sizeSpring, height: sizeSpring }}
        className="grid shrink-0 place-items-center rounded-2xl border border-white/[0.10] bg-[rgba(14,15,20,0.85)] shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur-md transition-shadow hover:border-emerald-300/30 hover:shadow-[0_12px_32px_rgba(52,211,153,0.18)]"
      >
        <img
          src={item.icon}
          alt={item.label}
          className="h-[45%] w-[45%] object-contain opacity-90 transition group-hover:opacity-100"
          style={{ minWidth: 14, minHeight: 14 }}
        />
      </Motion.a>
    </div>
  );
}

export default function MagneticDock() {
  const [enabled, setEnabled] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(DOCK_MEDIA_QUERY).matches : false,
  );
  const dockRef = useRef(null);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const media = window.matchMedia(DOCK_MEDIA_QUERY);
    const onChange = (event) => setEnabled(event.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      ref={dockRef}
    >
      <div className="flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-[rgba(8,9,12,0.55)] px-3 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {DOCK_ITEMS.map((item) => (
          <DockItem key={item.label} item={item} mouseX={mouseX} />
        ))}
      </div>
      {/* Dock reflection */}
      <div className="mx-auto mt-0.5 h-px w-4/5 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
    </div>
  );
}
