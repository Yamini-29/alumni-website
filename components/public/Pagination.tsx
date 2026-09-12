"use client";

export default function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (page: number) => void }) {
  if (totalPages <= 1) return null;
  return <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-3">
    <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#0B1E3C] disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
    <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
    <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className="rounded-lg bg-[#0B1E3C] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">Next</button>
  </nav>;
}
