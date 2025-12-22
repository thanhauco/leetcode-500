"use client";

import { useRef, useState } from "react";
import Editor from "./Editor";
import { runnerWorkerSource } from "@/lib/runnerWorkerSource";
import type { RunnerSpec, TestCase } from "@/data";

type Result = {
  name: string;
  pass: boolean;
  actual?: string;
  expected?: string;
  error?: string;
  ms?: number;
};

const TIMEOUT_MS = 4000;

export default function Playground({
  runner,
  tests,
}: {
  runner: RunnerSpec;
  tests: TestCase[];
}) {
  const [code, setCode] = useState(runner.jsStarter);
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);
  const [ranOnce, setRanOnce] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  function cleanup() {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }

  function runTests() {
    setRunning(true);
    setError("");
    setResults([]);
    setRanOnce(true);

    const blob = new Blob([runnerWorkerSource], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    workerRef.current = worker;

    const timer = setTimeout(() => {
      cleanup();
      setRunning(false);
      setError("Timed out after 4s — check for an infinite loop.");
    }, TIMEOUT_MS);

    worker.onmessage = (e: MessageEvent) => {
      clearTimeout(timer);
      const data = e.data;
      if (data?.ok) {
        setResults(data.results as Result[]);
      } else {
        setError(data?.error ?? "Unknown error");
      }
      setRunning(false);
      cleanup();
      URL.revokeObjectURL(url);
    };

    worker.onerror = (e) => {
      clearTimeout(timer);
      setError(e.message || "Worker error");
      setRunning(false);
      cleanup();
      URL.revokeObjectURL(url);
    };

    worker.postMessage({
      code,
      entry: runner.entry,
      tests,
      comparison: runner.comparison ?? "deep",
    });
  }

  const passed = results.filter((r) => r.pass).length;
  const total = results.length;
  const allPass = ranOnce && total > 0 && passed === total;

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-ink-900/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧪</span>
          <h3 className="font-semibold text-slate-100">Playground</h3>
          <span className="hidden text-xs text-slate-500 sm:inline">
            runs <code className="font-mono text-brand-400">{runner.entry}()</code> against {tests.length} cases — in your browser
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost px-3 py-1.5 text-xs"
            onClick={() => {
              setCode(runner.jsStarter);
              setResults([]);
              setError("");
              setRanOnce(false);
            }}
          >
            Reset
          </button>
          <button
            className="btn-ghost px-3 py-1.5 text-xs"
            onClick={() => {
              setCode(runner.jsReference);
              setResults([]);
              setError("");
              setRanOnce(false);
            }}
          >
            Load solution
          </button>
          <button className="btn-primary px-4 py-1.5 text-xs" onClick={runTests} disabled={running}>
            {running ? "Running…" : "▶ Run tests"}
          </button>
        </div>
      </div>

      <div className="border-b border-white/10">
        <Editor value={code} onChange={setCode} language="javascript" editable height="320px" />
      </div>

      <div className="p-4">
        {!ranOnce && (
          <p className="text-sm text-slate-500">
            Edit the function and press <span className="font-semibold text-slate-300">Run tests</span> — or load the
            reference solution to see it pass.
          </p>
        )}

        {error && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        {total > 0 && (
          <div className="space-y-2">
            <div
              className={`flex items-center gap-2 text-sm font-semibold ${
                allPass ? "text-emerald-400" : "text-amber-300"
              }`}
            >
              <span>{allPass ? "✅ All tests passed" : `⚠ ${passed}/${total} passed`}</span>
            </div>
            <ul className="divide-y divide-white/5 overflow-hidden rounded-lg border border-white/10">
              {results.map((r, i) => (
                <li key={i} className="flex flex-col gap-1 bg-ink-900/40 px-3 py-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span>{r.pass ? "✅" : "❌"}</span>
                      <span className="font-medium text-slate-200">{r.name}</span>
                    </span>
                    {typeof r.ms === "number" && <span className="text-xs text-slate-500">{r.ms} ms</span>}
                  </div>
                  {!r.pass && (
                    <div className="ml-6 font-mono text-xs text-slate-400">
                      {r.error ? (
                        <span className="text-red-300">threw: {r.error}</span>
                      ) : (
                        <>
                          <div>
                            expected: <span className="text-emerald-300">{r.expected}</span>
                          </div>
                          <div>
                            got: <span className="text-red-300">{r.actual}</span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
