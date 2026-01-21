// LeetCode 66 — Plus One (Easy)
// Category: Math & Geometry · Approach: Carry
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/plus-one/

function plusOne(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  return [1, ...digits];
}
