// LeetCode 190 — Reverse Bits (Easy)
// Category: Bit Manipulation · Approach: Bit by Bit
// Time: O(1) | Space: O(1)
// Source: https://leetcode.com/problems/reverse-bits/

function reverseBits(n: number): number {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n = n >>> 1;
  }
  return result >>> 0;
}
