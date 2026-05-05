import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { socialLinks, profile } from "../data/portfolio";

const formInitial = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [data, setData] = useState(formInitial);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // success | error | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("https://formsubmit.co/ajax/srivastavaojas454@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject || `Portfolio contact from ${data.name}`,
          message: data.message,
          _subject: data.subject || `Portfolio contact from ${data.name}`,
          _captcha: "false",
          _template: "table",
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("success");
        setData(formInitial);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => setStatus(null), 6000);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="section-shell">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[0.55fr_0.45fr]">
          <Motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="eyebrow">// 07 — Contact</p>
            <h2 className="display-h2 mt-6">
              Let's build something
              <span className="italic gradient-text-accent"> clear, useful</span>,
              and ready to ship.
            </h2>
          </Motion.div>

          <Motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="text-[15px] leading-[1.75] text-zinc-400"
          >
            I'm open to software internships, freelance builds, collaborative projects,
            and conversations around AI product ideas. Reach out — I read every message.
          </Motion.p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Form card */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="panel-strong overflow-hidden rounded-xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
              </div>
              <span className="font-mono text-[11px] text-zinc-500">~/contact</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                FORM
              </span>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="01 // Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                />
                <Field
                  label="02 // Email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="you@domain.com"
                  disabled={isSubmitting}
                />
              </div>

              <Field
                label="03 // Subject"
                name="subject"
                value={data.subject}
                onChange={handleChange}
                placeholder="Internship · Freelance · Collaboration"
                disabled={isSubmitting}
                required={false}
              />

              <label className="grid gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300/90">
                  04 // Message
                </span>
                <textarea
                  name="message"
                  value={data.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  disabled={isSubmitting}
                  placeholder="Tell me what you want to build..."
                  className="resize-none rounded-md border border-white/[0.08] bg-black/40 px-4 py-3 text-[14px] text-white placeholder:text-zinc-600 outline-none transition focus:border-emerald-300/60 focus:bg-black/60 disabled:opacity-60"
                />
              </label>

              {status === "success" && (
                <p className="rounded-md border border-emerald-300/40 bg-emerald-300/[0.08] px-4 py-3 font-mono text-[12px] text-emerald-100">
                  ▸ Message delivered. I'll reply soon.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-md border border-rose-300/40 bg-rose-300/[0.08] px-4 py-3 font-mono text-[12px] text-rose-100">
                  ⚠ Couldn't send right now. Please email me directly.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "SENDING..." : "Send Message"}
                  <span>↗</span>
                </button>
                <a href={`mailto:${profile.email}`} className="btn-ghost">
                  Or email directly
                </a>
              </div>
            </form>
          </Motion.div>

          {/* Side info */}
          <Motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="grid gap-4"
          >
            <div className="panel rounded-xl p-6">
              <p className="label-mono">Direct line</p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-3 block break-all font-display text-[1.5rem] font-normal tracking-ultratight text-white transition hover:text-emerald-200"
              >
                {profile.email}
              </a>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                {profile.phone}
              </p>
              <div className="mt-5 grid gap-2 text-[13px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-600">▸</span>
                  <span>Surat, India · {profile.origin} (origin)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-600">▸</span>
                  <span>Replies usually within a day.</span>
                </div>
              </div>
            </div>

            <div className="panel rounded-xl p-6">
              <p className="label-mono">Channels</p>
              <div className="mt-4 grid gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-md border border-white/[0.07] bg-white/[0.015] px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-emerald-300/[0.04]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-md bg-black/40">
                      <img src={s.icon} alt="" className="h-4 w-4 object-contain" />
                    </span>
                    <span className="flex-1 text-[13px] font-semibold text-zinc-200 group-hover:text-white">
                      {s.name}
                    </span>
                    <span className="text-zinc-600 transition group-hover:text-emerald-300">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-300/25 bg-emerald-300/[0.05] p-6">
              <p className="label-mono text-emerald-200/80">Status</p>
              <p className="mt-3 font-display text-2xl tracking-ultratight text-white">
                Available · Summer 2026
              </p>
              <p className="mt-2 text-[13px] leading-[1.7] text-zinc-300">
                Looking for SDE or AI internships, freelance contracts, or research
                collaborations. Open to remote and on-site.
              </p>
            </div>
          </Motion.aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text", disabled, required = true }) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300/90">
        {label}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="rounded-md border border-white/[0.08] bg-black/40 px-4 py-3 text-[14px] text-white placeholder:text-zinc-600 outline-none transition focus:border-emerald-300/60 focus:bg-black/60 disabled:opacity-60"
      />
    </label>
  );
}
