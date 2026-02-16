// LeetCode 371 — Sum of Two Integers (Medium)
// Category: Bit Manipulation · Approach: Bitwise Add
// Time: O(1) | Space: O(1)
// Source: https://leetcode.com/problems/sum-of-two-integers/

function getSum(a: number, b: number): number {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}
