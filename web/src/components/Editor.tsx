"use client";

import dynamic from "next/dynamic";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import type { Extension } from "@codemirror/state";

// Load CodeMirror only on the client (it touches the DOM).
const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

export type EditorLanguage = "python" | "typescript" | "javascript" | "text";

function languageExtensions(language: EditorLanguage): Extension[] {
  switch (language) {
    case "python":
      return [python()];
    case "typescript":
      return [javascript({ typescript: true })];
    case "javascript":
      return [javascript()];
    default:
      return [];
  }
}

export default function Editor({
  value,
  onChange,
  language = "javascript",
  editable = false,
  height = "auto",
  minHeight,
  maxHeight,
}: {
  value: string;
  onChange?: (value: string) => void;
  language?: EditorLanguage;
  editable?: boolean;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={oneDark}
      editable={editable}
      height={height}
      minHeight={minHeight}
      maxHeight={maxHeight}
      extensions={languageExtensions(language)}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: editable,
        highlightActiveLineGutter: editable,
        autocompletion: false,
        searchKeymap: false,
      }}
    />
  );
}
