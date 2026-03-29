// LeetCode 977 — Squares of a Sorted Array (Easy)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/squares-of-a-sorted-array/

function sortedSquares(nums: number[]): number[] {
  const n = nums.length;
  const res = new Array<number>(n);
  let l = 0;
  let r = n - 1;
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(nums[l]) > Math.abs(nums[r])) {
      res[i] = nums[l] * nums[l];
      l++;
    } else {
      res[i] = nums[r] * nums[r];
      r--;
    }
  }
  return res;
}
