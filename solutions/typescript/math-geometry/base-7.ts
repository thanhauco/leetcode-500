// LeetCode 504 — Base 7 (Easy)
// Category: Math & Geometry · Approach: Repeated division
// Time: O(log n) | Space: O(log n)
// Source: https://leetcode.com/problems/base-7/

function convertToBase7(num: number): string {
  if (num === 0) return "0";
  const neg = num < 0;
  num = Math.abs(num);
  let digits = "";
  while (num > 0) {
    digits = String(num % 7) + digits;
    num = Math.floor(num / 7);
  }
  return neg ? "-" + digits : digits;
}
