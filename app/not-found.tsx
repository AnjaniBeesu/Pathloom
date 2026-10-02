import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <main className="section min-h-[70vh]"><div className="shell"><p className="eyebrow">404 / path not found</p><h1 className="headline mt-6 max-w-[660px]">This path has not been woven yet.</h1><p className="body-copy mt-6 max-w-[480px]">The page may have moved, or it might be part of a future Pathloom phase.</p><Link href="/" className="button-primary mt-8"><ArrowLeft size={16} /> Back home</Link></div></main>; }
