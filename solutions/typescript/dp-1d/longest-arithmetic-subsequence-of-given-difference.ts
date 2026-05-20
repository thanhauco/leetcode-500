// LeetCode 1218 — Longest Arithmetic Subsequence of Given Difference (Medium)
// Category: 1-D Dynamic Programming · Approach: Hash Map DP
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/

function longestSubsequence(arr: number[], difference: number): number {
  const dp = new Map<number, number>();
  let best = 0;
  for (const x of arr) {
    const len = (dp.get(x - difference) ?? 0) + 1;
    dp.set(x, len);
    best = Math.max(best, len);
  }
  return best;
}
