// LeetCode 27 — Remove Element (Easy)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/remove-element/

function removeElement(nums: number[], val: number): number {
  let k = 0;
  for (const x of nums) {
    if (x !== val) nums[k++] = x;
  }
  return k;
}
