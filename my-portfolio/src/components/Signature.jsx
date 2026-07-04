import { useEffect, useId, useState } from "react";
import { motion as Motion } from "framer-motion";
import { parse as parseFont } from "opentype.js";

/**
 * Handwriting "signature" that draws itself, letter by letter.
 * Each glyph is converted to its own path (via opentype.js) and the strokes
 * are staggered with framer-motion `pathLength`, then the fill fades in —
 * so it reads like a pen writing the name. An optional shimmer sweeps a
 * highlight across the finished signature.
 *
 * Per-glyph paths (rather than one kerned path) avoid opentype.js emitting
 * NaN control points for some fonts — which silently truncated the name.
 */

const fontCache = new Map();

async function loadFont(path) {
  const cached = fontCache.get(path);
  if (cached) return cached;
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Font load failed: ${path}`);
  const buffer = await res.arrayBuffer();
  const font = parseFont(buffer);
  fontCache.set(path, font);
  return font;
}

export default function Signature({
  text = "Signature",
  color = "#34d399",
  shimmerColor = "#ecfff6",
  fontSize = 64,
  duration = 1.35,
  delay = 0,
  staggerStep = 0.16,
  strokeWidth = 2,
  fill = true,
  shimmer = true,
  className,
  inView = true,
  once = true,
  onReady,
  fontPath = "/KaushanScript-Regular.ttf",
}) {
  const [paths, setPaths] = useState([]);
  const [box, setBox] = useState({ x: 0, y: -fontSize, w: 300, h: fontSize * 1.6 });
  const gradId = `sig-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const font = await loadFont(fontPath);
        const scale = fontSize / font.unitsPerEm;
        let x = 0;
        const next = [];
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        for (const char of text) {
          const glyph = font.charToGlyph(char);
          // Baseline at y = 0; ascenders negative, descenders positive.
          const path = glyph.getPath(x, 0, fontSize);
          const data = path.toPathData(3);
          const bb = path.getBoundingBox();
          const hasContent =
            data &&
            !data.includes("NaN") &&
            Number.isFinite(bb.x1) &&
            bb.x2 > bb.x1 &&
            bb.y2 > bb.y1;
          if (hasContent) {
            minX = Math.min(minX, bb.x1);
            minY = Math.min(minY, bb.y1);
            maxX = Math.max(maxX, bb.x2);
            maxY = Math.max(maxY, bb.y2);
            next.push(data);
          }
          x += (glyph.advanceWidth ?? font.unitsPerEm) * scale;
        }

        if (!Number.isFinite(minX)) {
          minX = 0;
          minY = -fontSize;
          maxX = x || fontSize;
          maxY = 0;
        }

        const pad = Math.max(fontSize * 0.18, strokeWidth * 3);
        if (cancelled) return;
        setPaths(next);
        setBox({
          x: minX - pad,
          y: minY - pad,
          w: maxX - minX + pad * 2,
          h: maxY - minY + pad * 2,
        });
        onReady?.();
      } catch {
        if (cancelled) return;
        setPaths([]);
        onReady?.();
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, fontSize, fontPath, strokeWidth]);

  const paint = shimmer ? `url(#${gradId})` : color;
  const variants = {
    hidden: { pathLength: 0, fillOpacity: 0, opacity: 0 },
    visible: { pathLength: 1, fillOpacity: fill ? 1 : 0, opacity: 1 },
  };

  return (
    <Motion.svg
      key={paths.length}
      width={box.w}
      height={box.h}
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      fill="none"
      className={className}
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : "visible"}
      viewport={{ once }}
      role="img"
      aria-label={text}
    >
      {shimmer && (
        <defs>
          <linearGradient
            id={gradId}
            gradientUnits="userSpaceOnUse"
            x1={box.x}
            y1="0"
            x2={box.x + box.w}
            y2="0"
          >
            <stop offset="0" stopColor={color} />
            <stop offset="0.4" stopColor={color} />
            <stop offset="0.5" stopColor={shimmerColor} />
            <stop offset="0.6" stopColor={color} />
            <stop offset="1" stopColor={color} />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from={`${-box.w} 0`}
              to={`${box.w} 0`}
              dur="3.4s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
      )}
      {paths.map((d, i) => {
        const start = delay + i * staggerStep;
        return (
          <Motion.path
            key={i}
            d={d}
            stroke={paint}
            strokeWidth={strokeWidth}
            fill={paint}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            variants={variants}
            transition={{
              pathLength: { delay: start, duration, ease: "easeInOut" },
              fillOpacity: { delay: start + duration * 0.55, duration: 0.6, ease: "easeOut" },
              opacity: { delay: start, duration: 0.01 },
            }}
          />
        );
      })}
    </Motion.svg>
  );
}
