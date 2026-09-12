"use client";

import { Bell, Pin } from "lucide-react";
import { useEffect, useState } from "react";

type Announcement = { id: string; title: string; description: string; category: string; publishDate: string; pinned: boolean };

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/public/announcements")
      .then((response) => response.json())
      .then((payload) => setItems(payload.items ?? []))
      .finally(() => setLoading(false));
  }, []);
  return <div className="min-h-screen bg-[#f8fafc] pb-16 pt-20"><header className="relative overflow-hidden bg-[#183b7a] px-6 py-16 text-white md:px-10"><div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[34px] border-[#c218d4]/20"/><div className="relative mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d8a11c]">Stay informed</p><h1 className="mt-3 text-4xl font-bold md:text-5xl">Announcements</h1><p className="mt-4 max-w-xl text-slate-200">The latest news, opportunities, and updates for our alumni.</p></div></header>
  <main className="mx-auto max-w-4xl px-6 py-12 md:px-10">{loading ? <p className="text-slate-500">Loading announcements...</p> : items.length ? <div className="space-y-5">{items.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_30px_rgba(24,59,122,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(24,59,122,0.12)] md:p-8"><div className="flex items-start justify-between gap-4"><div><div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#82690d]"><Bell size={17} className="text-[#c218d4]"/>{item.category}{item.pinned && <span className="flex items-center gap-1 text-[#183b7a]"><Pin size={15}/>Pinned</span>}</div><h2 className="text-2xl font-bold text-[#183b7a]">{item.title}</h2></div><time className="shrink-0 text-sm text-slate-400">{item.publishDate}</time></div><p className="mt-4 leading-7 text-slate-600">{item.description}</p></article>)}</div> : <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">No announcements have been published yet.</div>}</main></div>;
}
