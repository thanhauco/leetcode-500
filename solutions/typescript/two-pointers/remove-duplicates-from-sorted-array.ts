// LeetCode 26 — Remove Duplicates from Sorted Array (Easy)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/remove-duplicates-from-sorted-array/

function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) nums[k++] = nums[i];
  }
  return k;
}
