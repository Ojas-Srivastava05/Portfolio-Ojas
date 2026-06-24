import { INTERNSHIP_AVAILABILITY } from "../data/portfolio";

/**
 * AvailabilityOrb — slides in from bottom-left after 8 s or 25% scroll.
 * Pulsing green orb with internship availability copy.
 * Click scrolls to contact. Dismiss with ×.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";

export default function AvailabilityOrb() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() =>
    typeof window !== "undefined" ? window.localStorage.getItem("availability-orb-dismissed") === "true" : false,
  );
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const timer = window.setTimeout(() => setVisible(true), 8000);

    const onScroll = () => {
      if (window.scrollY > document.body.scrollHeight * 0.22) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dismissed]);

  const goToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    setExpanded(false);
  };

  const dismiss = () => {
    setDismissed(true);
    window.localStorage.setItem("availability-orb-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <Motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          data-ui-chrome="true"
          className="fixed bottom-8 left-5 z-[105] hidden md:block"
        >
          <div
            className={`group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border border-emerald-300/30 bg-[rgba(8,9,12,0.90)] px-4 py-3 shadow-[0_12px_40px_rgba(52,211,153,0.18)] backdrop-blur-xl transition-all duration-500 hover:border-emerald-300/60 ${
              expanded ? "pr-5" : ""
            }`}
            onClick={() => setExpanded((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setExpanded((v) => !v);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Availability status"
          >
            {/* Pulse orb */}
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            </span>

            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
              Available · {INTERNSHIP_AVAILABILITY}
            </span>

            <AnimatePresence>
              {expanded && (
                <Motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToContact();
                    }}
                    className="ml-2 rounded-md border border-emerald-300/40 bg-emerald-300/[0.12] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200 transition hover:bg-emerald-300/20"
                  >
                    Ping me →
                  </button>
                </Motion.div>
              )}
            </AnimatePresence>

            {/* Dismiss */}
            <button
              type="button"
              aria-label="Dismiss"
              onClick={(e) => {
                e.stopPropagation();
                dismiss();
              }}
              className="ml-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:text-zinc-200"
            >
              ×
            </button>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
