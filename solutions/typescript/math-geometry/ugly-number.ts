// LeetCode 263 — Ugly Number (Easy)
// Category: Math & Geometry · Approach: Factor Stripping
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/ugly-number/

function isUgly(n: number): boolean {
  if (n <= 0) return false;
  for (const p of [2, 3, 5]) {
    while (n % p === 0) n = Math.floor(n / p);
  }
  return n === 1;
}
