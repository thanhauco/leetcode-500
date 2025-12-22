"use client";

import { useEffect, useId, useRef, useState } from "react";

let initialized = false;

async function getMermaid() {
  const mermaid = (await import("mermaid")).default;
  if (!initialized) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "dark",
      themeVariables: {
        background: "transparent",
        primaryColor: "#1f1f38",
        primaryTextColor: "#e2e8f0",
        primaryBorderColor: "#6366f1",
        lineColor: "#818cf8",
        secondaryColor: "#16162a",
        tertiaryColor: "#11111f",
        fontFamily: "var(--font-sans)",
        fontSize: "14px",
      },
    });
    initialized = true;
  }
  return mermaid;
}

export default function Mermaid({ chart }: { chart: string }) {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const mermaid = await getMermaid();
        const { svg } = await mermaid.render(`mmd-${reactId}`, chart);
        if (active) {
          setSvg(svg);
          setError("");
        }
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : String(err));
      }
    })();
    return () => {
      active = false;
    };
  }, [chart, reactId]);

  if (error) {
    return (
      <pre className="overflow-auto rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-amber-200">
        {chart}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-host overflow-x-auto rounded-xl border border-white/10 bg-ink-900/60 p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
