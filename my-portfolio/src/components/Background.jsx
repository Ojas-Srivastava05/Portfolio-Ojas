export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(52, 211, 153, 0.06), transparent 70%), radial-gradient(50% 50% at 80% 100%, rgba(99, 102, 241, 0.05), transparent 75%), #08090c",
        }}
      />

      {/* Fine dot lattice */}
      <div className="dot-bg absolute inset-0 mask-fade-b opacity-70" />

      {/* Subtle blueprint lines */}
      <div
        className="absolute inset-0 mask-fade-b opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "112px 112px",
        }}
      />

      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink to-transparent" />

      {/* Soft noise */}
      <div className="noise" />
    </div>
  );
}
