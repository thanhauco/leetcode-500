// LeetCode 201 — Bitwise AND of Numbers Range (Medium)
// Category: Bit Manipulation · Approach: Common Prefix
// Time: O(log right) | Space: O(1)
// Source: https://leetcode.com/problems/bitwise-and-of-numbers-range/

function rangeBitwiseAnd(left: number, right: number): number {
  let shift = 0;
  while (left < right) {
    left >>= 1;
    right >>= 1;
    shift++;
  }
  return left << shift;
}
