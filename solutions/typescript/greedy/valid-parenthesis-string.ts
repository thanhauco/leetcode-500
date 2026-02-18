// LeetCode 678 — Valid Parenthesis String (Medium)
// Category: Greedy · Approach: Greedy Range
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/valid-parenthesis-string/

function checkValidString(s: string): boolean {
  let lo = 0, hi = 0;
  for (const ch of s) {
    if (ch === "(") {
      lo++;
      hi++;
    } else if (ch === ")") {
      lo--;
      hi--;
    } else {
      lo--;
      hi++;
    }
    if (hi < 0) return false;
    if (lo < 0) lo = 0;
  }
  return lo === 0;
}
