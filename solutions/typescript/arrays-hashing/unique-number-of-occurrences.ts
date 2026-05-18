// LeetCode 1207 — Unique Number of Occurrences (Easy)
// Category: Arrays & Hashing · Approach: Hash Map
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/unique-number-of-occurrences/

function uniqueOccurrences(arr: number[]): boolean {
  const counts = new Map<number, number>();
  for (const x of arr) counts.set(x, (counts.get(x) ?? 0) + 1);
  const freqs = [...counts.values()];
  return new Set(freqs).size === freqs.length;
}
