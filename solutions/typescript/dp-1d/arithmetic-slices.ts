// LeetCode 413 — Arithmetic Slices (Medium)
// Category: 1-D Dynamic Programming · Approach: Running count
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/arithmetic-slices/

function numberOfArithmeticSlices(nums: number[]): number {
  let total = 0, cur = 0;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
      cur++;
      total += cur;
    } else {
      cur = 0;
    }
  }
  return total;
}
