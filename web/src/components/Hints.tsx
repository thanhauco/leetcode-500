"use client";

import { useState } from "react";

export default function Hints({ hints }: { hints: string[] }) {
  const [revealed, setRevealed] = useState(0);

  if (!hints.length) return null;

  return (
    <div className="space-y-2">
      {hints.slice(0, revealed).map((h, i) => (
        <div key={i} className="rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3 text-sm text-amber-100 animate-fade-up">
          <span className="font-semibold text-amber-300">Hint {i + 1}.</span> {h}
        </div>
      ))}
      {revealed < hints.length && (
        <button className="btn-ghost px-3 py-1.5 text-xs" onClick={() => setRevealed((r) => r + 1)}>
          💡 Reveal hint {revealed + 1} of {hints.length}
        </button>
      )}
    </div>
  );
}
