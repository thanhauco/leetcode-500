// LeetCode 738 — Monotone Increasing Digits (Medium)
// Category: Greedy · Approach: Greedy from right
// Time: O(d) | Space: O(d)
// Source: https://leetcode.com/problems/monotone-increasing-digits/

function monotoneIncreasingDigits(n: number): number {
  const d = String(n).split("").map(Number);
  let mark = d.length;
  for (let i = d.length - 1; i > 0; i--) {
    if (d[i - 1] > d[i]) {
      d[i - 1]--;
      mark = i;
    }
  }
  for (let i = mark; i < d.length; i++) d[i] = 9;
  return Number(d.join(""));
}
