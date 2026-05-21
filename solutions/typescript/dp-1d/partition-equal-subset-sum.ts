// LeetCode 416 — Partition Equal Subset Sum (Medium)
// Category: 1-D Dynamic Programming · Approach: Boolean Knapsack
// Time: O(n * sum) | Space: O(sum)
// Source: https://leetcode.com/problems/partition-equal-subset-sum/

function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const t = sum / 2;
  const dp = new Array<boolean>(t + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let j = t; j >= x; j--) dp[j] = dp[j] || dp[j - x];
  }
  return dp[t];
}
