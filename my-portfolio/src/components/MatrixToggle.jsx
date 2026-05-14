import { motion as Motion } from "framer-motion";
import { useSiteFx } from "../context/SiteFxContext";

/**
 * Placed upper-right beneath the navbar so it never stacks under AvailabilityOrb (bottom-left Summer 2026 chip).
 */
export default function MatrixToggle() {
  const { matrixRain, toggleMatrixRain } = useSiteFx();

  return (
    <Motion.button
      type="button"
      data-ui-chrome="true"
      aria-label={matrixRain ? "Turn off Matrix digital rain backdrop" : "Turn on Matrix digital rain backdrop"}
      aria-pressed={matrixRain}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.95, duration: 0.4 }}
      onClick={() => toggleMatrixRain()}
      className={`fixed right-4 top-[8rem] z-[56] flex max-w-[10.5rem] items-center gap-2 rounded-full border px-3 py-2 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.72)] backdrop-blur-xl transition-colors sm:right-7 sm:top-[7.5rem] lg:right-[6.75rem] ${
        matrixRain
          ? "border-emerald-400/42 bg-emerald-400/[0.11] text-emerald-50"
          : "border-white/[0.12] bg-[rgba(8,9,12,0.78)] text-zinc-400 hover:border-emerald-300/32 hover:bg-emerald-300/[0.06] hover:text-emerald-100"
      }`}
    >
      <span
        className={`grid h-[1.125rem] w-[1.125rem] place-items-center rounded border text-[7px] font-bold leading-none ${
          matrixRain
            ? "border-emerald-300/48 bg-black/38 text-emerald-200"
            : "border-white/[0.1] bg-black/26 text-zinc-600"
        }`}
      >
        mtx
      </span>
      <span className="flex min-w-0 flex-col text-left">
        <span className="font-mono text-[8px] font-bold uppercase leading-tight tracking-[0.22em] text-zinc-500">
          Rain
        </span>
        <span className="truncate font-mono text-[11px] font-semibold leading-tight text-white">
          {matrixRain ? "On" : "Off"}
        </span>
      </span>
    </Motion.button>
  );
}
