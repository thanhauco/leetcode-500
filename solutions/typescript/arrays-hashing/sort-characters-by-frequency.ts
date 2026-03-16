// LeetCode 451 — Sort Characters By Frequency (Medium)
// Category: Arrays & Hashing · Approach: Sort by Count
// Time: O(n + k log k) | Space: O(n)
// Source: https://leetcode.com/problems/sort-characters-by-frequency/

function frequencySort(s: string): string {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  const chars = [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)!);
  return chars.map((ch) => ch.repeat(counts.get(ch)!)).join("");
}
