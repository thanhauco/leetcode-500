// LeetCode 405 — Convert a Number to Hexadecimal (Easy)
// Category: Bit Manipulation · Approach: Nibble by nibble
// Time: O(1) | Space: O(1)
// Source: https://leetcode.com/problems/convert-a-number-to-hexadecimal/

function toHex(num: number): string {
  if (num === 0) return "0";
  const digits = "0123456789abcdef";
  let n = num >>> 0;
  let res = "";
  while (n > 0) {
    res = digits[n & 15] + res;
    n = n >>> 4;
  }
  return res;
}
