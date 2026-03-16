// LeetCode 383 — Ransom Note (Easy)
// Category: Arrays & Hashing · Approach: Frequency Compare
// Time: O(n + m) | Space: O(1)
// Source: https://leetcode.com/problems/ransom-note/

function canConstruct(ransomNote: string, magazine: string): boolean {
  const counts = new Map<string, number>();
  for (const ch of magazine) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  for (const ch of ransomNote) {
    const c = counts.get(ch) ?? 0;
    if (c === 0) return false;
    counts.set(ch, c - 1);
  }
  return true;
}
