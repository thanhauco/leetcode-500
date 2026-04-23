// LeetCode 326 — Power of Three (Easy)
// Category: Math & Geometry · Approach: Repeated Division
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/power-of-three/

function isPowerOfThree(n: number): boolean {
  if (n < 1) return false;
  while (n % 3 === 0) n = Math.floor(n / 3);
  return n === 1;
}
