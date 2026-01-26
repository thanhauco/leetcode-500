// LeetCode 392 — Is Subsequence (Easy)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/is-subsequence/

function isSubsequence(s: string, t: string): boolean {
  let i = 0;
  for (const ch of t) {
    if (i < s.length && s[i] === ch) i++;
  }
  return i === s.length;
}
