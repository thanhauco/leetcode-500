// LeetCode 720 — Longest Word in Dictionary (Medium)
// Category: Tries · Approach: Set + sort
// Time: O(Σ word length) | Space: O(Σ word length)
// Source: https://leetcode.com/problems/longest-word-in-dictionary/

function longestWord(words: string[]): string {
  const set = new Set(words);
  let best = "";
  for (const w of [...words].sort()) {
    let ok = true;
    for (let i = 1; i < w.length; i++) {
      if (!set.has(w.slice(0, i))) { ok = false; break; }
    }
    if (ok && w.length > best.length) best = w;
  }
  return best;
}
