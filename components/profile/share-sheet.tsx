"use client";

import { Check, Copy, Share2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { encodePublicPayloadForBrowser, publicPayloadFromState } from "@/lib/public-profile";
import type { Phase2State } from "@/lib/phase2-store";

export function ShareSheet({ state, onClose }: { state: Phase2State; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const payload = useMemo(() => publicPayloadFromState(state), [state]);
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);
  if (!payload) return null;
  const profile = payload;
  const token = encodePublicPayloadForBrowser(profile); const link = origin ? `${origin}/u/${encodeURIComponent(profile.username)}?share=${token}` : "";
  async function copyLink() { if (!link) return; await navigator.clipboard.writeText(link); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
  async function nativeShare() { if (!link) return; if (navigator.share) await navigator.share({ title: `${profile.displayName || profile.username}'s Pathloom`, text: "See my progress path on Pathloom.", url: link }); else await copyLink(); }
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 p-4 sm:items-center"><div role="dialog" aria-modal="true" aria-labelledby="share-title" className="w-full max-w-[520px] rounded-shell border border-line bg-surface p-6 shadow-[var(--shadow-soft)] md:p-8"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Share intentionally</p><h2 id="share-title" className="mt-3 text-[24px] font-semibold tracking-[-.04em]">A small window into your path.</h2></div><button onClick={onClose} aria-label="Close share dialog" className="button-quiet min-h-9 w-9 p-0"><X size={16} /></button></div><p className="mt-4 text-[13px] leading-5 text-muted">This link includes only your chosen display name, goal, deadline, and completed milestones. Provider handles and private workspace data stay out. The snapshot expires after 30 days; turning sharing off prevents new links, but copied links remain available until expiry.</p><div className="mt-6 rounded-card border border-line bg-muted-surface p-4"><p className="text-[11px] font-semibold uppercase tracking-[.08em] text-muted">Preview link</p><p className="mt-2 break-all text-[12px] leading-5 text-ink">{link}</p></div><div className="mt-6 flex flex-col gap-2 sm:flex-row"><button onClick={() => void nativeShare()} className="button-primary flex-1"><Share2 size={15} /> Share link</button><button onClick={() => void copyLink()} className="button-quiet flex-1">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Copied" : "Copy link"}</button></div></div></div>;
}
