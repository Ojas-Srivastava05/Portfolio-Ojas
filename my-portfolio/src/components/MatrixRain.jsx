import { useEffect, useRef } from "react";

/** Subtle backdrop rain — prominence kept below foreground content */
export default function MatrixRain({ active, intensity = 1 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !active) return undefined;

    const ctx2 = canvas.getContext("2d");
    let raf;

    const cols = [];
    let w = 0;
    let h = 0;
    let fontPx = 13;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
      /* Wider gutter = softer column density than the “neon wall” variant */
      fontPx = Math.max(12, Math.round(13 * intensity));
      const stride = Math.max(14, Math.round(fontPx * 1.2));
      const columnCount = Math.ceil(w / stride);
      cols.length = 0;
      for (let i = 0; i < columnCount; i++) {
        cols.push({
          y: Math.random() * h,
          speed: (0.38 + Math.random() * 0.85) * intensity,
          xStride: stride,
          phase: Math.random() * Math.PI * 2,
        });
      }
      ctx2.font = `${fontPx}px JetBrains Mono, ui-monospace, monospace`;
    }

    resize();
    window.addEventListener("resize", resize);

    function frame() {
      ctx2.fillStyle = "rgba(8, 9, 12, 0.11)";
      ctx2.fillRect(0, 0, w, h);

      cols.forEach((col, i) => {
        const x = i * col.xStride + 1;
        col.phase += 0.018;
        const chars = "01アイキλ∑01";
        const ch = chars[(Math.random() * chars.length) | 0];

        const g = 118 + Math.random() * 75;
        const headA = Math.min(0.55, 0.22 + intensity * 0.05 + Math.sin(col.phase + i) * 0.05);
        ctx2.fillStyle = `rgba(95, ${g}, 160, ${headA})`;
        ctx2.fillText(ch, x, col.y);

        if (Math.random() > 0.55) {
          const tailCh = chars[(Math.random() * chars.length) | 0];
          ctx2.fillStyle = `rgba(52, ${110 + Math.random() * 60}, 118, ${0.1 + Math.random() * 0.12})`;
          ctx2.fillText(tailCh, x, col.y - fontPx * 0.88);
        }

        col.y += col.xStride * col.speed * 0.88;
        if (col.y > h + fontPx * 14) col.y = -Math.random() * (h / 4);
      });
      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active, intensity]);

  if (!active) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] opacity-[0.22] mix-blend-screen sm:opacity-[0.26] md:opacity-[0.28]"
    />
  );
}
