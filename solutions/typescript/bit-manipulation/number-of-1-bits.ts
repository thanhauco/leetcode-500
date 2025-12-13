// LeetCode 191 — Number of 1 Bits (Easy)
// Category: Bit Manipulation · Approach: Unsigned shift
// Time: O(set bits) | Space: O(1)
// Source: https://leetcode.com/problems/number-of-1-bits/

function hammingWeight(n: number): number {
  let count = 0;
  let x = n >>> 0; // treat as unsigned 32-bit
  while (x) {
    count += x & 1;
    x >>>= 1;
  }
  return count;
}
