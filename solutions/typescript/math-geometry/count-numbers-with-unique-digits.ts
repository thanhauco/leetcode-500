// LeetCode 357 — Count Numbers with Unique Digits (Medium)
// Category: Math & Geometry · Approach: Combinatorial count
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/count-numbers-with-unique-digits/

function countNumbersWithUniqueDigits(n: number): number {
  if (n === 0) return 1;
  let total = 10;
  let unique = 9;
  let available = 9;
  for (let i = 0; i < n - 1; i++) {
    unique *= available;
    total += unique;
    available -= 1;
  }
  return total;
}
