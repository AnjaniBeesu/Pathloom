"use client";
import { RefreshCw } from "lucide-react";
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <main className="section min-h-[70vh]"><div className="shell"><p className="eyebrow">Something went quiet</p><h1 className="headline mt-6 max-w-[660px]">That did not load as planned.</h1><p className="body-copy mt-6 max-w-[480px]">Try once more. If it keeps happening, the path may need a little attention.</p><button onClick={() => reset()} className="button-primary mt-8"><RefreshCw size={16} /> Try again</button></div></main>; }
