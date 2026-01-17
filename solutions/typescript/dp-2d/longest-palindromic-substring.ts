// LeetCode 5 — Longest Palindromic Substring (Medium)
// Category: 2-D Dynamic Programming · Approach: Expand Around Center
// Time: O(n^2) | Space: O(1)
// Source: https://leetcode.com/problems/longest-palindromic-substring/

function longestPalindrome(s: string): string {
  if (s.length < 2) return s;
  let start = 0, maxLen = 1;
  const expand = (l: number, r: number): void => {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > maxLen) { maxLen = r - l - 1; start = l + 1; }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + maxLen);
}
