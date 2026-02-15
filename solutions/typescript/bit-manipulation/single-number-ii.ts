// LeetCode 137 — Single Number II (Medium)
// Category: Bit Manipulation · Approach: Bit Counters
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/single-number-ii/

function singleNumber(nums: number[]): number {
  let ones = 0, twos = 0;
  for (const x of nums) {
    ones = (ones ^ x) & ~twos;
    twos = (twos ^ x) & ~ones;
  }
  return ones;
}
