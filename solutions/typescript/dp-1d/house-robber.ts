// LeetCode 198 — House Robber (Medium)
// Category: 1-D Dynamic Programming · Approach: Rolling DP
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/house-robber/

function rob(nums: number[]): number {
  let robCur = 0, skip = 0;
  for (const v of nums) {
    [robCur, skip] = [skip + v, Math.max(robCur, skip)];
  }
  return Math.max(robCur, skip);
}
