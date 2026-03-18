// LeetCode 154 — Find Minimum in Rotated Sorted Array II (Hard)
// Category: Binary Search · Approach: Binary search
// Time: O(log n) avg, O(n) worst | Space: O(1)
// Source: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/

function findMin(nums: number[]): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else if (nums[mid] < nums[hi]) hi = mid;
    else hi--;
  }
  return nums[lo];
}
