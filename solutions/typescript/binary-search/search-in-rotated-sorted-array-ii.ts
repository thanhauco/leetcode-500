// LeetCode 81 — Search in Rotated Sorted Array II (Medium)
// Category: Binary Search · Approach: Binary search
// Time: O(n) worst case | Space: O(1)
// Source: https://leetcode.com/problems/search-in-rotated-sorted-array-ii/

function search(nums: number[], target: number): boolean {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return true;
    if (nums[lo] === nums[mid] && nums[mid] === nums[hi]) {
      lo++;
      hi--;
    } else if (nums[lo] <= nums[mid]) {
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return false;
}
