import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { navItems, profile, socialLinks } from "../data/portfolio";

function buildCommands({ closePalette, setToast }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    closePalette();
  };

  const open = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
    closePalette();
  };

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(`Copied ${label}`);
    } catch {
      setToast(`Couldn't copy ${label}`);
    }
    closePalette();
  };

  const navCommands = navItems.map((n) => ({
    id: `nav-${n.id}`,
    group: "Navigate",
    title: `Go to ${n.name}`,
    hint: `#${n.id}`,
    keywords: `${n.name} ${n.id}`,
    icon: "→",
    action: () => scrollTo(n.id),
  }));

  const socialCommands = socialLinks.map((s) => ({
    id: `social-${s.name}`,
    group: "Profiles",
    title: `Open ${s.name}`,
    hint: s.href.replace(/^https?:\/\//, "").replace(/^mailto:/, ""),
    keywords: `${s.name} link profile open`,
    icon: "↗",
    action: () => {
      if (s.href.startsWith("http")) open(s.href);
      else {
        window.location.href = s.href;
        closePalette();
      }
    },
  }));

  const utility = [
    {
      id: "copy-email",
      group: "Quick actions",
      title: "Copy email address",
      hint: profile.email,
      keywords: "copy email mail address contact",
      icon: "@",
      action: () => copy(profile.email, "email"),
    },
    {
      id: "copy-phone",
      group: "Quick actions",
      title: "Copy phone number",
      hint: profile.phone,
      keywords: "copy phone number call",
      icon: "☏",
      action: () => copy(profile.phone, "phone"),
    },
    {
      id: "download-resume",
      group: "Quick actions",
      title: "Download resume",
      hint: "Resume.pdf",
      keywords: "resume cv download pdf",
      icon: "↓",
      action: () => {
        const a = document.createElement("a");
        a.href = profile.resume;
        a.download = "Ojas-Srivastava-Resume.pdf";
        a.click();
        closePalette();
      },
    },
    {
      id: "view-source",
      group: "Quick actions",
      title: "View this site's source",
      hint: "github.com/Ojas-Srivastava05",
      keywords: "github source repo code",
      icon: "<>",
      action: () => open("https://github.com/Ojas-Srivastava05/Portfolio-Ojas.git"),
    },
    {
      id: "scroll-top",
      group: "Quick actions",
      title: "Scroll to top",
      hint: "Home",
      keywords: "top home up",
      icon: "↑",
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        closePalette();
      },
    },
  ];

  return [...navCommands, ...socialCommands, ...utility];
}

function fuzzyScore(query, target) {
  if (!query) return 1;
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return 2;
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length ? 1 : 0;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const closePalette = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  const commands = useMemo(
    () => buildCommands({ closePalette, setToast }),
    [],
  );

  const filtered = useMemo(() => {
    if (!query) return commands;
    return commands
      .map((c) => ({
        ...c,
        score: Math.max(
          fuzzyScore(query, c.title) * 2,
          fuzzyScore(query, c.keywords),
          fuzzyScore(query, c.group),
        ),
      }))
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query, commands]);

  const grouped = useMemo(() => {
    const out = {};
    filtered.forEach((c) => {
      if (!out[c.group]) out[c.group] = [];
      out[c.group].push(c);
    });
    return out;
  }, [filtered]);

  useEffect(() => {
    const onKey = (e) => {
      const isToggle =
        (e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey);
      if (isToggle) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closePalette();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(filtered.length - 1, a + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[active];
        if (cmd) cmd.action();
      }
    };
    const onCustomOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, [open, filtered, active]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const node = listRef.current?.querySelector(`[data-active="true"]`);
    if (node) node.scrollIntoView({ block: "nearest" });
  }, [active]);

  let runningIndex = -1;

  return (
    <>
      <AnimatePresence>
        {open && (
          <Motion.div
            key="palette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[150] grid place-items-start justify-center px-4 pt-[14vh] sm:pt-[18vh]"
          >
            <Motion.div
              className="absolute inset-0 bg-ink/80 backdrop-blur-md"
              onClick={closePalette}
            />
            <Motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-label="Command palette"
              className="relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-white/[0.10] bg-[rgba(14,15,20,0.96)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                  ▸
                </span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search anywhere — projects, profiles, copy email…"
                  className="flex-1 bg-transparent font-mono text-[14px] text-white placeholder:text-zinc-600 outline-none"
                />
                <kbd className="rounded-md border border-white/[0.10] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  esc
                </kbd>
              </div>

              <div ref={listRef} className="max-h-[55vh] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-5 py-10 text-center font-mono text-[12px] text-zinc-500">
                    No matches. Try{" "}
                    <span className="text-emerald-300">projects</span>,{" "}
                    <span className="text-emerald-300">copy email</span>, or{" "}
                    <span className="text-emerald-300">resume</span>.
                  </div>
                ) : (
                  Object.entries(grouped).map(([group, items]) => (
                    <div key={group} className="px-2 pb-1.5 pt-2">
                      <p className="px-3 pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
                        {group}
                      </p>
                      {items.map((c) => {
                        runningIndex += 1;
                        const isActive = runningIndex === active;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            data-active={isActive}
                            onMouseEnter={() => setActive(runningIndex)}
                            onClick={c.action}
                            className={`group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition ${
                              isActive
                                ? "bg-emerald-300/[0.08] text-white"
                                : "text-zinc-300 hover:bg-white/[0.025]"
                            }`}
                          >
                            <span
                              className={`grid h-7 w-7 shrink-0 place-items-center rounded-md border font-mono text-[12px] ${
                                isActive
                                  ? "border-emerald-300/40 bg-emerald-300/[0.12] text-emerald-200"
                                  : "border-white/[0.06] bg-black/40 text-zinc-500"
                              }`}
                            >
                              {c.icon}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[13.5px] font-medium">
                                {c.title}
                              </p>
                              {c.hint && (
                                <p className="truncate font-mono text-[11px] text-zinc-500">
                                  {c.hint}
                                </p>
                              )}
                            </div>
                            {isActive && (
                              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                                ⏎
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] bg-black/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                <div className="flex items-center gap-3">
                  <span>
                    <kbd className="rounded border border-white/[0.10] bg-white/[0.04] px-1 py-0.5 text-zinc-300">
                      ↑↓
                    </kbd>{" "}
                    navigate
                  </span>
                  <span>
                    <kbd className="rounded border border-white/[0.10] bg-white/[0.04] px-1 py-0.5 text-zinc-300">
                      ⏎
                    </kbd>{" "}
                    select
                  </span>
                </div>
                <span className="text-emerald-300">
                  {filtered.length} {filtered.length === 1 ? "result" : "results"}
                </span>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <Motion.div
            key="toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-6 left-1/2 z-[160] -translate-x-1/2 rounded-full border border-emerald-300/30 bg-[rgba(8,9,12,0.9)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-200 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur"
          >
            <span className="text-emerald-300">▸</span> {toast}
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
