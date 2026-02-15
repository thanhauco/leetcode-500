// LeetCode 162 — Find Peak Element (Medium)
// Category: Binary Search · Approach: Binary search
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/find-peak-element/

function findPeakElement(nums: number[]): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[mid + 1]) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
