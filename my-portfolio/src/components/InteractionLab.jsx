import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { navItems } from "../data/portfolio";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const GO_MAP = {
  h: "hero",
  a: "about",
  w: "experience",
  p: "projects",
  s: "coding-stats",
  t: "toolkit",
  c: "contact",
};

function isEditable(el) {
  if (!el) return false;
  const tag = el.tagName?.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    el.isContentEditable
  );
}

export default function InteractionLab() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showHelp, setShowHelp] = useState(false);
  const [toast, setToast] = useState(null);
  const [screenshotMode, setScreenshotMode] = useState(false);
  const [turboMode, setTurboMode] = useState(false);
  const gPrefixRef = useRef(false);
  const konamiRef = useRef([]);

  const sectionIds = useMemo(() => navItems.map((n) => n.id), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 180;
      const current =
        [...navItems]
          .reverse()
          .find((n) => {
            const el = document.getElementById(n.id);
            return el && el.offsetTop <= y;
          })
          ?.id || "hero";
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("screenshot-mode", screenshotMode);
    return () => document.documentElement.classList.remove("screenshot-mode");
  }, [screenshotMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("turbo-mode", turboMode);
    return () => document.documentElement.classList.remove("turbo-mode");
  }, [turboMode]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 1600);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const jumpTo = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setToast(`Jumped to ${id.replace("-", " ")}`);
    };

    const stepSection = (dir) => {
      const i = sectionIds.indexOf(activeSection);
      const next = Math.max(0, Math.min(sectionIds.length - 1, i + dir));
      if (sectionIds[next] && sectionIds[next] !== activeSection) jumpTo(sectionIds[next]);
    };

    const copySectionLink = async () => {
      const url = `${window.location.origin}${window.location.pathname}#${activeSection}`;
      try {
        await navigator.clipboard.writeText(url);
        setToast("Section link copied");
      } catch {
        setToast("Copy failed");
      }
    };

    const onKey = (e) => {
      if (isEditable(e.target)) return;

      // Konami detector
      const nextSeq = [...konamiRef.current, e.key].slice(-KONAMI.length);
      konamiRef.current = nextSeq;
      if (KONAMI.every((k, idx) => nextSeq[idx] === k)) {
        setTurboMode((v) => !v);
        setToast(turboMode ? "Turbo mode off" : "Turbo mode on");
        konamiRef.current = [];
        return;
      }

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setShowHelp((v) => !v);
        return;
      }

      if (showHelp && e.key === "Escape") {
        e.preventDefault();
        setShowHelp(false);
        return;
      }

      if (e.shiftKey && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
        setScreenshotMode((v) => !v);
        setToast(!screenshotMode ? "Screenshot mode on" : "Screenshot mode off");
        return;
      }

      if (e.shiftKey && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
        copySectionLink();
        return;
      }

      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        stepSection(1);
        return;
      }

      if (e.key === "k" || e.key === "K") {
        if (e.metaKey || e.ctrlKey) return; // leave cmd/ctrl+k for palette
        e.preventDefault();
        stepSection(-1);
        return;
      }

      if (gPrefixRef.current) {
        gPrefixRef.current = false;
        const target = GO_MAP[e.key.toLowerCase()];
        if (target) {
          e.preventDefault();
          jumpTo(target);
        }
        return;
      }

      if (e.key === "g" || e.key === "G") {
        gPrefixRef.current = true;
        window.setTimeout(() => {
          gPrefixRef.current = false;
        }, 900);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeSection, screenshotMode, showHelp, sectionIds, turboMode]);

  return (
    <>
      <AnimatePresence>
        {showHelp && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[145] grid place-items-center p-4"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowHelp(false)}
              aria-label="Close shortcuts help"
            />
            <Motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="relative w-full max-w-xl rounded-2xl border border-white/[0.10] bg-[rgba(8,9,12,0.96)] p-5 shadow-2xl"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                Shortcut Lab
              </p>
              <h3 className="mt-2 font-display text-3xl text-white">Power controls</h3>
              <div className="mt-5 grid gap-2 text-sm text-zinc-300">
                <p><kbd>⌘/Ctrl + K</kbd> Open command palette</p>
                <p><kbd>?</kbd> Toggle this shortcuts panel</p>
                <p><kbd>J</kbd>/<kbd>K</kbd> Next / previous section</p>
                <p><kbd>G</kbd> then <kbd>H/A/W/P/S/T/C</kbd> Jump to a section</p>
                <p><kbd>Shift + C</kbd> Copy current section deep link</p>
                <p><kbd>Shift + S</kbd> Toggle screenshot mode</p>
                <p><kbd>Konami Code</kbd> Toggle hidden turbo glow mode</p>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-6 left-6 z-[120] hidden sm:flex items-center gap-2">
        {screenshotMode && (
          <span className="rounded-full border border-amber-300/30 bg-amber-300/[0.08] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-200">
            shot mode
          </span>
        )}
        {turboMode && (
          <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/[0.10] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fuchsia-200">
            turbo
          </span>
        )}
      </div>

      <AnimatePresence>
        {toast && (
          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 z-[160] -translate-x-1/2 rounded-full border border-white/[0.12] bg-[rgba(8,9,12,0.92)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-200 shadow-2xl"
          >
            {toast}
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
