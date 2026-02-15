// LeetCode 540 — Single Element in a Sorted Array (Medium)
// Category: Binary Search · Approach: Binary search on pairs
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/single-element-in-a-sorted-array/

function singleNonDuplicate(nums: number[]): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    let mid = (lo + hi) >> 1;
    if (mid % 2 === 1) mid--;
    if (nums[mid] === nums[mid + 1]) lo = mid + 2;
    else hi = mid;
  }
  return nums[lo];
}
