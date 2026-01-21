// LeetCode 9 — Palindrome Number (Easy)
// Category: Math & Geometry · Approach: Reverse Half
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/palindrome-number/

function isPalindrome(x: number): boolean {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let reverted = 0;
  while (x > reverted) {
    reverted = reverted * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === reverted || x === Math.floor(reverted / 10);
}
