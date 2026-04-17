// LeetCode 89 — Gray Code (Medium)
// Category: Bit Manipulation · Approach: Reflected Formula
// Time: O(2^n) | Space: O(2^n)
// Source: https://leetcode.com/problems/gray-code/

function grayCode(n: number): number[] {
  const total = 1 << n;
  const res: number[] = [];
  for (let i = 0; i < total; i++) res.push(i ^ (i >> 1));
  return res;
}
