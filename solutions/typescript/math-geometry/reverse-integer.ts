// LeetCode 7 — Reverse Integer (Medium)
// Category: Math & Geometry · Approach: Digit Peel
// Time: O(log x) | Space: O(1)
// Source: https://leetcode.com/problems/reverse-integer/

function reverse(x: number): number {
  const sign = x < 0 ? -1 : 1;
  let n = Math.abs(x);
  let rev = 0;
  while (n > 0) {
    rev = rev * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  rev *= sign;
  if (rev < -(2 ** 31) || rev > 2 ** 31 - 1) return 0;
  return rev;
}
