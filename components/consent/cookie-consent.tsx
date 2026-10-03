"use client";

import { Check, Settings2, X } from "lucide-react";
import { useEffect, useState } from "react";

type Choice = { analytics: boolean; preferences: boolean; savedAt: number };
const STORAGE_KEY = "pathloom-consent";
const YEAR = 1000 * 60 * 60 * 24 * 365;

function readChoice(): Choice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Choice;
    return Date.now() - parsed.savedAt < YEAR ? parsed : null;
  } catch { return null; }
}

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);
  const [customise, setCustomise] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [preferences, setPreferences] = useState(false);

  useEffect(() => {
    const stored = readChoice();
    if (stored) { setChoice(stored); setAnalytics(stored.analytics); setPreferences(stored.preferences); }
    const reopen = () => { setOpen(true); setCustomise(true); };
    window.addEventListener("pathloom:cookie-settings", reopen);
    return () => window.removeEventListener("pathloom:cookie-settings", reopen);
  }, []);

  const save = (nextAnalytics: boolean, nextPreferences: boolean) => {
    const next = { analytics: nextAnalytics, preferences: nextPreferences, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(JSON.stringify(next))}; Max-Age=31536000; Path=/; SameSite=Lax`;
    setChoice(next); setOpen(false); setCustomise(false);
  };

  if (choice && !open) return null;
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-[560px] rounded-[20px] border border-line bg-surface p-5 shadow-[var(--shadow-soft)] sm:inset-x-auto sm:bottom-6 sm:p-6" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <div className="flex items-start justify-between gap-4"><div><p id="cookie-title" className="text-[15px] font-semibold tracking-[-0.02em]">Your choices, your pace.</p><p id="cookie-description" className="mt-2 max-w-[430px] text-[13px] leading-5 text-muted">Pathloom uses essential storage to remember settings. Optional analytics and preferences only load when you choose them.</p></div><button type="button" onClick={() => setOpen(false)} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted hover:bg-muted-surface" aria-label="Close cookie settings"><X aria-hidden="true" size={15} /></button></div>
      {customise && <div className="mt-5 divide-y divide-line rounded-xl border border-line"><label className="flex items-center justify-between gap-4 p-3.5 text-[13px]"><span><span className="block font-medium">Essential</span><span className="text-muted">Always on for core settings.</span></span><span className="rounded-full bg-accent-soft px-2 py-1 text-[11px] font-medium text-accent">On</span></label><label className="flex cursor-pointer items-center justify-between gap-4 p-3.5 text-[13px]"><span><span className="block font-medium">Analytics</span><span className="text-muted">Helps us understand page use.</span></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" /></label><label className="flex cursor-pointer items-center justify-between gap-4 p-3.5 text-[13px]"><span><span className="block font-medium">Preferences</span><span className="text-muted">Remembers optional interface choices.</span></span><input type="checkbox" checked={preferences} onChange={(event) => setPreferences(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" /></label></div>}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end"><button onClick={() => save(false, false)} className="button-quiet min-h-10 flex-1 px-3 text-[12px] sm:flex-none">Reject non-essential</button><button onClick={() => save(true, true)} className="button-primary min-h-10 flex-1 px-3 text-[12px] sm:flex-none"><Check size={14} /> Accept all</button><button onClick={() => { if (customise) save(analytics, preferences); else setCustomise(true); }} className="button-quiet min-h-10 flex-1 px-3 text-[12px] sm:flex-none"><Settings2 size={14} /> {customise ? "Save choices" : "Customise"}</button></div>
    </div>
  );
}
