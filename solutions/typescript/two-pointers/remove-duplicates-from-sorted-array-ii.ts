// LeetCode 80 — Remove Duplicates from Sorted Array II (Medium)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/

function removeDuplicates(nums: number[]): number {
  let k = 0;
  for (const x of nums) {
    if (k < 2 || nums[k - 2] !== x) {
      nums[k] = x;
      k++;
    }
  }
  return k;
}
