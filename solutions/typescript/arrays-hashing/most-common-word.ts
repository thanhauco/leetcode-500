// LeetCode 819 — Most Common Word (Easy)
// Category: Arrays & Hashing · Approach: Regex + Map
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/most-common-word/

function mostCommonWord(paragraph: string, banned: string[]): string {
  const ban = new Set(banned.map((w) => w.toLowerCase()));
  const words = paragraph.toLowerCase().match(/[a-z]+/g) ?? [];
  const counts = new Map<string, number>();
  let best = "";
  let bestCount = 0;
  for (const w of words) {
    if (ban.has(w)) continue;
    const c = (counts.get(w) ?? 0) + 1;
    counts.set(w, c);
    if (c > bestCount) {
      bestCount = c;
      best = w;
    }
  }
  return best;
}
