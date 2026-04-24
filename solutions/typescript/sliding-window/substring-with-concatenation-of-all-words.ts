// LeetCode 30 — Substring with Concatenation of All Words (Hard)
// Category: Sliding Window · Approach: Hash Map Window
// Time: O(n*m) | Space: O(m)
// Source: https://leetcode.com/problems/substring-with-concatenation-of-all-words/

function findSubstring(s: string, words: string[]): number[] {
  const res: number[] = [];
  if (words.length === 0) return res;
  const wordLen = words[0].length;
  const count = words.length;
  const total = wordLen * count;
  if (total > s.length) return res;
  const need = new Map<string, number>();
  for (const w of words) need.set(w, (need.get(w) ?? 0) + 1);
  for (let i = 0; i + total <= s.length; i++) {
    const seen = new Map<string, number>();
    let ok = true;
    for (let j = 0; j < count; j++) {
      const chunk = s.slice(i + j * wordLen, i + (j + 1) * wordLen);
      const required = need.get(chunk);
      if (required === undefined) {
        ok = false;
        break;
      }
      const next = (seen.get(chunk) ?? 0) + 1;
      if (next > required) {
        ok = false;
        break;
      }
      seen.set(chunk, next);
    }
    if (ok) res.push(i);
  }
  return res;
}
