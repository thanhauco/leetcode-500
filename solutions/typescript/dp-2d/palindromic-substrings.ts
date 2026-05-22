// LeetCode 647 — Palindromic Substrings (Medium)
// Category: 2-D Dynamic Programming · Approach: Expand Around Center
// Time: O(n^2) | Space: O(1)
// Source: https://leetcode.com/problems/palindromic-substrings/

function countSubstrings(s: string): number {
  let total = 0;
  for (let center = 0; center < 2 * s.length - 1; center++) {
    let l = Math.floor(center / 2);
    let r = l + (center % 2);
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      total++;
      l--;
      r++;
    }
  }
  return total;
}
