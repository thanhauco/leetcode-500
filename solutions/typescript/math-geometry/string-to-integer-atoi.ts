// LeetCode 8 — String to Integer (atoi) (Medium)
// Category: Math & Geometry · Approach: Phased Parse
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/string-to-integer-atoi/

function myAtoi(s: string): number {
  let i = 0;
  const n = s.length;
  while (i < n && s[i] === " ") i++;
  let sign = 1;
  if (i < n && (s[i] === "+" || s[i] === "-")) {
    if (s[i] === "-") sign = -1;
    i++;
  }
  let num = 0;
  while (i < n && s[i] >= "0" && s[i] <= "9") {
    num = num * 10 + (s.charCodeAt(i) - 48);
    i++;
  }
  num *= sign;
  const INT_MIN = -(2 ** 31), INT_MAX = 2 ** 31 - 1;
  if (num < INT_MIN) return INT_MIN;
  if (num > INT_MAX) return INT_MAX;
  return num;
}
