// LeetCode 693 — Binary Number with Alternating Bits (Easy)
// Category: Bit Manipulation · Approach: Shift and XOR
// Time: O(1) | Space: O(1)
// Source: https://leetcode.com/problems/binary-number-with-alternating-bits/

function hasAlternatingBits(n: number): boolean {
  const x = n ^ (n >> 1);
  return (x & (x + 1)) === 0;
}
