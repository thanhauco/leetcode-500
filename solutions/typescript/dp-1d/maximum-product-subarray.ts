// LeetCode 152 — Maximum Product Subarray (Medium)
// Category: 1-D Dynamic Programming · Approach: Track Max & Min
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/maximum-product-subarray/

function maxProduct(nums: number[]): number {
  let best = nums[0], curMax = nums[0], curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const a = curMax * x, b = curMin * x;
    curMax = Math.max(x, a, b);
    curMin = Math.min(x, a, b);
    best = Math.max(best, curMax);
  }
  return best;
}
