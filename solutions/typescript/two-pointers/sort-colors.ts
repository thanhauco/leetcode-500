// LeetCode 75 — Sort Colors (Medium)
// Category: Two Pointers · Approach: Dutch National Flag
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/sort-colors/

function sortColors(nums: number[]): number[] {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
  return nums;
}
