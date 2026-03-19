// LeetCode 377 — Combination Sum IV (Medium)
// Category: 1-D Dynamic Programming · Approach: Bottom-Up DP
// Time: O(target * len(nums)) | Space: O(target)
// Source: https://leetcode.com/problems/combination-sum-iv/

function combinationSum4(nums: number[], target: number): number {
  const dp = new Array<number>(target + 1).fill(0);
  dp[0] = 1;
  for (let t = 1; t <= target; t++) {
    for (const v of nums) {
      if (v <= t) dp[t] += dp[t - v];
    }
  }
  return dp[target];
}
