import { useEffect, useRef } from "react";

/**
 * Seamless, infinitely-looping background video.
 *
 * A single clip has a hard cut when it loops. This stacks two copies and
 * crossfades from one to the other across the loop boundary, so the cut is
 * always hidden behind a soft dissolve — the motion feels continuous.
 * Playback is also slowed slightly for a calmer, cinematic feel.
 *
 * Respects prefers-reduced-motion (shows a still frame, no playback).
 */
export default function CinematicVideo({
  src,
  className,
  fade = 1.1,
  rate = 0.8,
  poster,
}) {
  const aRef = useRef(null);
  const bRef = useRef(null);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return undefined;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    a.style.opacity = "1";
    b.style.opacity = "0";

    // Reduced motion: hold a single still frame, no crossfade, no playback.
    if (prefersReduced) {
      try {
        a.pause();
        b.pause();
      } catch {
        /* noop */
      }
      return undefined;
    }

    let current = a;
    let next = b;
    let raf = 0;

    a.playbackRate = rate;
    b.playbackRate = rate;
    b.pause();
    try {
      b.currentTime = 0;
    } catch {
      /* noop */
    }
    a.play().catch(() => {});

    const tick = () => {
      const dur = current.duration;
      if (dur && Number.isFinite(dur)) {
        const remaining = dur - current.currentTime;
        if (remaining <= fade) {
          if (next.paused) {
            try {
              next.currentTime = 0;
            } catch {
              /* noop */
            }
            next.play().catch(() => {});
          }
          const t = Math.min(1, Math.max(0, 1 - remaining / fade));
          current.style.opacity = String(1 - t);
          next.style.opacity = String(t);

          if (remaining <= 0.05) {
            current.style.opacity = "0";
            next.style.opacity = "1";
            try {
              current.pause();
              current.currentTime = 0;
            } catch {
              /* noop */
            }
            const swap = current;
            current = next;
            next = swap;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Autoplay may be deferred until the tab becomes visible/interactive.
    const kick = () => {
      if (!document.hidden) current.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", kick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", kick);
    };
  }, [src, fade, rate]);

  const videoClass = "absolute inset-0 h-full w-full object-cover";

  return (
    <div className={className}>
      <video
        ref={aRef}
        muted
        playsInline
        preload="auto"
        poster={poster}
        className={videoClass}
        src={src}
      />
      <video
        ref={bRef}
        muted
        playsInline
        preload="auto"
        poster={poster}
        className={videoClass}
        src={src}
      />
    </div>
  );
}
