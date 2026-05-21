// LeetCode 494 — Target Sum (Medium)
// Category: 1-D Dynamic Programming · Approach: Subset Sum Count
// Time: O(n * s) | Space: O(s)
// Source: https://leetcode.com/problems/target-sum/

function findTargetSumWays(nums: number[], target: number): number {
  const total = nums.reduce((a, b) => a + b, 0);
  if (Math.abs(target) > total || (total + target) % 2 !== 0) return 0;
  const s = (total + target) / 2;
  const dp = new Array<number>(s + 1).fill(0);
  dp[0] = 1;
  for (const x of nums) {
    for (let j = s; j >= x; j--) dp[j] += dp[j - x];
  }
  return dp[s];
}
