import { AnimatePresence, motion as Motion } from "framer-motion";
import { useSiteFx } from "../context/SiteFxContext";

export default function FxToast() {
  const { fxToast } = useSiteFx();

  return (
    <AnimatePresence>
      {fxToast && (
        <Motion.div
          key={fxToast}
          role="status"
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed left-1/2 top-[4.75rem] z-[190] flex -translate-x-1/2 items-center gap-2 rounded-full border border-fuchsia-400/35 bg-black/85 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-200 shadow-[0_12px_40px_-12px_rgba(192,132,252,0.65)] backdrop-blur-md"
        >
          <span className="animate-pulse">▮</span>
          {fxToast}
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
