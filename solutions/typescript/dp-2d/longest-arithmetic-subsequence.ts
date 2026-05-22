// LeetCode 1027 — Longest Arithmetic Subsequence (Medium)
// Category: 2-D Dynamic Programming · Approach: Per-index Difference Map
// Time: O(n^2) | Space: O(n^2)
// Source: https://leetcode.com/problems/longest-arithmetic-subsequence/

function longestArithSeqLength(nums: number[]): number {
  const n = nums.length;
  const dp: Map<number, number>[] = Array.from({ length: n }, () => new Map());
  let best = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const d = nums[i] - nums[j];
      const len = (dp[j].get(d) ?? 1) + 1;
      dp[i].set(d, len);
      best = Math.max(best, len);
    }
  }
  return best;
}
