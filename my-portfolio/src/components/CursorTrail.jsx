/**
 * CursorTrail — emerald ink drops that spawn at cursor position and fade out.
 * Desktop pointer only. Pure CSS animation, zero external deps beyond React.
 */
import { useEffect, useRef, useState } from "react";

let uid = 0;

export default function CursorTrail() {
  const [enabled, setEnabled] = useState(false);
  const [drops, setDrops] = useState([]);
  const lastPos = useRef(null);
  const throttle = useRef(null);

  useEffect(() => {
    const ok =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(hover: none)").matches;
    setEnabled(ok);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const spawn = (x, y) => {
      const id = uid++;
      const size = Math.random() * 8 + 5;
      const dx = (Math.random() - 0.5) * 10;
      const dy = (Math.random() - 0.5) * 10 - 6;
      const colors = [
        "rgba(52, 211, 153, 0.65)",
        "rgba(110, 231, 183, 0.50)",
        "rgba(251, 191, 36, 0.45)",
        "rgba(167, 243, 208, 0.55)",
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const drop = { id, x, y, size, dx, dy, color };
      setDrops((prev) => [...prev.slice(-28), drop]);
      window.setTimeout(() => {
        setDrops((prev) => prev.filter((d) => d.id !== id));
      }, 900);
    };

    const onMove = (e) => {
      if (throttle.current) return;
      throttle.current = window.setTimeout(() => {
        throttle.current = null;
      }, 40);

      const { clientX: x, clientY: y } = e;
      const last = lastPos.current;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        if (dx * dx + dy * dy < 30) return; // only spawn when moving fast enough
      }
      lastPos.current = { x, y };
      spawn(x, y);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (throttle.current) window.clearTimeout(throttle.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[115] overflow-hidden">
      {drops.map((d) => (
        <span
          key={d.id}
          style={{
            position: "absolute",
            left: d.x,
            top: d.y,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: d.color,
            transform: "translate(-50%, -50%)",
            filter: "blur(1.5px)",
            animation: `ink-drop 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            "--dx": `${d.dx}px`,
            "--dy": `${d.dy}px`,
          }}
        />
      ))}
    </div>
  );
}
