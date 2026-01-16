// LeetCode 35 — Search Insert Position (Easy)
// Category: Binary Search · Approach: Lower Bound
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/search-insert-position/

function searchInsert(nums: number[], target: number): number {
  let lo = 0, hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
