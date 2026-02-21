// LeetCode 50 — Pow(x, n) (Medium)
// Category: Math & Geometry · Approach: Fast Power
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/powx-n/

function myPow(x: number, n: number): number {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) result *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
}
