import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  categoryBySlug,
  getProblemById,
  getProblemBySlug,
  problems,
} from "@/data";
import Markdown from "@/components/Markdown";
import Mermaid from "@/components/Mermaid";
import CodeBlock from "@/components/CodeBlock";
import SolutionTabs from "@/components/SolutionTabs";
import Playground from "@/components/Playground";
import Hints from "@/components/Hints";
import CompanyChips from "@/components/CompanyChips";
import DifficultyBadge from "@/components/DifficultyBadge";

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) return { title: "Not found" };
  return {
    title: `${problem.id}. ${problem.title}`,
    description: problem.description,
  };
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 text-xl font-bold text-slate-100">
        <span>{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function ProblemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) notFound();

  const category = categoryBySlug[problem.category];
  const color = category?.color ?? "#6366f1";
  const related = (problem.relatedIds ?? [])
    .map((id) => getProblemById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <Link href="/problems" className="text-sm text-slate-400 hover:text-brand-400">
        ← All problems
      </Link>

      {/* Header */}
      <header className="card space-y-4 p-6" style={{ borderTop: `3px solid ${color}` }}>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/problems?category=${problem.category}`}
            className="chip border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
          >
            {category?.icon} {category?.name}
          </Link>
          <DifficultyBadge difficulty={problem.difficulty} />
          <span className="chip border border-white/10 bg-white/5 text-slate-400">
            🔥 {problem.frequency}/100 frequency
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-50">
          <span className="text-slate-500">{problem.id}.</span> {problem.title}
        </h1>

        <div className="flex flex-wrap gap-1.5">
          {problem.patterns.map((p) => (
            <span key={p} className="chip bg-brand/10 text-brand-400">
              {p}
            </span>
          ))}
        </div>

        <div>
          <p className="mb-1.5 text-xs uppercase tracking-wide text-slate-500">Asked at</p>
          <CompanyChips companies={problem.companies} max={12} />
        </div>

        <a
          href={problem.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost w-fit px-4 py-2 text-sm"
        >
          Open on LeetCode ↗
        </a>
      </header>

      {/* Problem statement */}
      <Section title="Problem" icon="📋">
        <Markdown>{problem.statement ?? problem.description}</Markdown>
      </Section>

      {/* Examples */}
      {problem.examples.length > 0 && (
        <Section title="Examples" icon="🔢">
          <div className="space-y-3">
            {problem.examples.map((ex, i) => (
              <div key={i} className="card space-y-1 p-4 font-mono text-sm">
                <div>
                  <span className="text-slate-500">Input: </span>
                  <span className="text-slate-200">{ex.input}</span>
                </div>
                <div>
                  <span className="text-slate-500">Output: </span>
                  <span className="text-emerald-300">{ex.output}</span>
                </div>
                {ex.explanation && (
                  <div className="pt-1 font-sans text-slate-400">{ex.explanation}</div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Constraints */}
      {problem.constraints && problem.constraints.length > 0 && (
        <Section title="Constraints" icon="📐">
          <ul className="list-inside list-disc space-y-1 font-mono text-sm text-slate-300">
            {problem.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Intuition */}
      <Section title="Intuition" icon="💡">
        <Markdown>{problem.intuition}</Markdown>
      </Section>

      {/* Approach */}
      <Section title="Approach" icon="🧭">
        <ol className="list-inside list-decimal space-y-2 text-slate-300">
          {problem.approach.map((step, i) => (
            <li key={i} className="pl-1">
              {step}
            </li>
          ))}
        </ol>
      </Section>

      {/* Pseudocode */}
      {problem.pseudocode && (
        <Section title="Pseudocode" icon="📝">
          <CodeBlock code={problem.pseudocode} language="text" label="Pseudocode" />
        </Section>
      )}

      {/* Diagram */}
      {problem.diagram && (
        <Section title="Visual walkthrough" icon="🎨">
          <Mermaid chart={problem.diagram} />
        </Section>
      )}

      {/* Complexity */}
      <Section title="Complexity" icon="⏱️">
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Time</p>
            <p className="font-mono text-lg text-brand-400">{problem.complexity.time}</p>
          </div>
          <div className="card p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Space</p>
            <p className="font-mono text-lg text-brand-400">{problem.complexity.space}</p>
          </div>
        </div>
        {problem.complexity.note && (
          <p className="text-sm text-slate-400">{problem.complexity.note}</p>
        )}
      </Section>

      {/* Solutions */}
      <Section title="Solutions" icon="💻">
        <SolutionTabs solutions={problem.solutions} />
      </Section>

      {/* Playground */}
      {problem.runner && problem.tests && problem.tests.length > 0 && (
        <Section title="Try it yourself" icon="🧪">
          <Playground runner={problem.runner} tests={problem.tests} />
        </Section>
      )}

      {/* Hints */}
      {problem.hints && problem.hints.length > 0 && (
        <Section title="Hints" icon="🤔">
          <Hints hints={problem.hints} />
        </Section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <Section title="Related problems" icon="🔗">
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/problems/${r.slug}`}
                className="chip border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              >
                {r.id}. {r.title}
              </Link>
            ))}
          </div>
        </Section>
      )}
    </article>
  );
}
