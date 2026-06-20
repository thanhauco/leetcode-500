// LeetCode 628 — Maximum Product of Three Numbers (Easy)
// Category: Math & Geometry · Approach: Sort and compare
// Time: O(n log n) | Space: O(1)
// Source: https://leetcode.com/problems/maximum-product-of-three-numbers/

function maximumProduct(nums: number[]): number {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  return Math.max(
    nums[n - 1] * nums[n - 2] * nums[n - 3],
    nums[0] * nums[1] * nums[n - 1],
  );
}
