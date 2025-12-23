"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";
import type { CodeSolution, Language } from "@/data";

const LABEL: Record<Language, string> = {
  python: "Python",
  typescript: "TypeScript",
  java: "Java",
  cpp: "C++",
};

function editorLang(lang: Language) {
  if (lang === "python") return "python" as const;
  if (lang === "typescript") return "typescript" as const;
  return "javascript" as const;
}

export default function SolutionTabs({ solutions }: { solutions: CodeSolution[] }) {
  const [active, setActive] = useState(0);
  const current = solutions[active];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {solutions.map((s, i) => (
          <button
            key={s.language + i}
            onClick={() => setActive(i)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              i === active
                ? "bg-brand text-white shadow-glow"
                : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            {LABEL[s.language]}
            {s.label ? <span className="ml-1 opacity-70">· {s.label}</span> : null}
          </button>
        ))}
      </div>
      <CodeBlock code={current.code} language={editorLang(current.language)} label={`${LABEL[current.language]}${current.label ? " · " + current.label : ""}`} />
    </div>
  );
}
