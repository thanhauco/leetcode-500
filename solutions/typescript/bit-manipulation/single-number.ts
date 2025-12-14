// LeetCode 136 — Single Number (Easy)
// Category: Bit Manipulation · Approach: XOR fold
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/single-number/

function singleNumber(nums: number[]): number {
  return nums.reduce((acc, x) => acc ^ x, 0);
}
