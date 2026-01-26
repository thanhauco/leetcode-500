// LeetCode 283 — Move Zeroes (Easy)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/move-zeroes/

function moveZeroes(nums: number[]): number[] {
  let write = 0;
  for (const x of nums) {
    if (x !== 0) nums[write++] = x;
  }
  for (let i = write; i < nums.length; i++) nums[i] = 0;
  return nums;
}
