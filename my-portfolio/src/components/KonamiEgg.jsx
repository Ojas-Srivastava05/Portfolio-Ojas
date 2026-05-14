import { useEffect } from "react";
import { useSiteFx } from "../context/SiteFxContext";

const SEQUENCE = [
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

export default function KonamiEgg() {
  const { activateChaos } = useSiteFx();

  useEffect(() => {
    let pos = 0;
    const stepStart = (k) => (k === SEQUENCE[0] ? 1 : 0);

    const onKeyDown = (e) => {
      const ae = document.activeElement;
      const tag = ae?.tagName?.toLowerCase();
      if (
        tag === "input" ||
        tag === "textarea" ||
        ae?.isContentEditable ||
        e.repeat
      ) {
        return;
      }

      const k = e.key;
      const expect = SEQUENCE[pos];
      const match =
        k === expect ||
        (expect.length === 1 && expect.toLowerCase() === expect && k.toLowerCase() === expect);

      if (!match) {
        pos = stepStart(k);
        return;
      }
      pos += 1;
      if (pos === SEQUENCE.length) {
        pos = 0;
        activateChaos();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activateChaos]);

  return null;
}
