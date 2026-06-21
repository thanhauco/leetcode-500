// LeetCode 400 — Nth Digit (Medium)
// Category: Math & Geometry · Approach: Locate the block
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/nth-digit/

function findNthDigit(n: number): number {
  let length = 1, count = 9, start = 1;
  while (n > length * count) {
    n -= length * count;
    length++;
    count *= 10;
    start *= 10;
  }
  const num = start + Math.floor((n - 1) / length);
  return Number(String(num)[(n - 1) % length]);
}
