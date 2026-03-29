// LeetCode 189 — Rotate Array (Medium)
// Category: Two Pointers · Approach: Triple Reverse
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/rotate-array/

function rotate(nums: number[], k: number): number[] {
  const n = nums.length;
  k %= n;
  const reverse = (i: number, j: number): void => {
    while (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
  };
  reverse(0, n - 1);
  reverse(0, k - 1);
  reverse(k, n - 1);
  return nums;
}
