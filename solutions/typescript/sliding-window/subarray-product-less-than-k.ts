// LeetCode 713 — Subarray Product Less Than K (Medium)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/subarray-product-less-than-k/

function numSubarrayProductLessThanK(nums: number[], k: number): number {
  if (k <= 1) return 0;
  let prod = 1;
  let left = 0;
  let count = 0;
  for (let right = 0; right < nums.length; right++) {
    prod *= nums[right];
    while (prod >= k) {
      prod /= nums[left];
      left++;
    }
    count += right - left + 1;
  }
  return count;
}
