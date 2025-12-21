"use client";

import { useState } from "react";
import Editor, { type EditorLanguage } from "./Editor";

const LABEL: Record<EditorLanguage, string> = {
  python: "Python",
  typescript: "TypeScript",
  javascript: "JavaScript",
  text: "Pseudocode",
};

export default function CodeBlock({
  code,
  language = "javascript",
  label,
}: {
  code: string;
  language?: EditorLanguage;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#282c34]">
      <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-3 py-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label ?? LABEL[language]}
        </span>
        <button
          onClick={copy}
          className="rounded-md px-2 py-1 text-xs text-slate-400 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <Editor value={code} language={language} editable={false} maxHeight="520px" />
    </div>
  );
}
