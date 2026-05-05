import { motion as Motion } from "framer-motion";
import { toolkit } from "../data/portfolio";

export default function Toolkit() {
  return (
    <section id="toolkit" className="relative overflow-hidden">
      <div className="section-shell">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[0.55fr_0.45fr]">
          <Motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="eyebrow">// 05 — Stack</p>
            <h2 className="display-h2 mt-6">
              The
              <span className="italic gradient-text-accent"> toolkit </span>
              I reach for to ship modern products.
            </h2>
          </Motion.div>

          <Motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="text-[15px] leading-[1.75] text-zinc-400"
          >
            A practical stack across languages, frameworks, data, and deployment — chosen
            for reliability over hype.
          </Motion.p>
        </div>

        {/* Categories */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04] md:grid-cols-2 lg:grid-cols-4">
          {toolkit.map((cat, i) => (
            <Motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06 }}
              className="group bg-ink-100 p-7 transition hover:bg-white/[0.02]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300/90">
                  {String(i + 1).padStart(2, "0")} / {cat.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                  {cat.skills.length}
                </span>
              </div>
              <p className="mt-3 font-display text-2xl tracking-ultratight text-white">
                {cat.title}
              </p>
              <p className="mt-1 text-[12.5px] leading-[1.6] text-zinc-500">
                {cat.blurb}
              </p>

              <div className="mt-6 grid gap-2">
                {cat.skills.map((s) => (
                  <div
                    key={s.name}
                    className="group/item flex items-center gap-3 rounded-md border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.04]"
                  >
                    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-md bg-black/50">
                      <img src={s.logo} alt="" className="h-4 w-4 object-contain" />
                    </span>
                    <span className="text-[13px] font-semibold text-zinc-200 transition group-hover/item:text-white">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </Motion.div>
          ))}
        </div>

        {/* Tool strip */}
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 overflow-hidden rounded-xl border border-white/[0.06] bg-black/30 mask-fade-edges"
        >
          <div className="ticker-track flex w-max gap-12 px-6 py-5">
            {[...toolkit, ...toolkit].flatMap((c) => c.skills).map((s, i) => (
              <div
                key={`${s.name}-${i}`}
                className="flex items-center gap-2 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.18em] text-zinc-500"
              >
                <img src={s.logo} alt="" className="h-3.5 w-3.5 object-contain opacity-80" />
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
