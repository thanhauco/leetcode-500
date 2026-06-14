// LeetCode 594 — Longest Harmonious Subsequence (Easy)
// Category: Arrays & Hashing · Approach: Counting
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/longest-harmonious-subsequence/

function findLHS(nums: number[]): number {
  const counts = new Map<number, number>();
  for (const x of nums) counts.set(x, (counts.get(x) ?? 0) + 1);
  let best = 0;
  for (const [k, c] of counts) {
    const next = counts.get(k + 1);
    if (next !== undefined) best = Math.max(best, c + next);
  }
  return best;
}
