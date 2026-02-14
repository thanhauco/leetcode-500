// LeetCode 34 — Find First and Last Position of Element in Sorted Array (Medium)
// Category: Binary Search · Approach: Two boundary searches
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/

function searchRange(nums: number[], target: number): number[] {
  const bound = (isLower: boolean): number => {
    let lo = 0;
    let hi = nums.length - 1;
    let ans = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (nums[mid] > target || (isLower && nums[mid] === target)) hi = mid - 1;
      else lo = mid + 1;
      if (nums[mid] === target) ans = mid;
    }
    return ans;
  };
  return [bound(true), bound(false)];
}
