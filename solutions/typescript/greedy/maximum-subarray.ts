// LeetCode 53 — Maximum Subarray (Medium)
// Category: Greedy · Approach: Kadane
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/maximum-subarray/

function maxSubArray(nums: number[]): number {
  let current = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}
