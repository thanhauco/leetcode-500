// LeetCode 172 — Factorial Trailing Zeroes (Medium)
// Category: Math & Geometry · Approach: Count factors of 5
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/factorial-trailing-zeroes/

function trailingZeroes(n: number): number {
  let count = 0;
  while (n > 0) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}
