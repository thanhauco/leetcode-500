// LeetCode 231 — Power of Two (Easy)
// Category: Math & Geometry · Approach: Bit Trick
// Time: O(1) | Space: O(1)
// Source: https://leetcode.com/problems/power-of-two/

function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}
