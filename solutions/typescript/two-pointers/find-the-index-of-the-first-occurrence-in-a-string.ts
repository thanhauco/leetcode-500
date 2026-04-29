// LeetCode 28 — Find the Index of the First Occurrence in a String (Easy)
// Category: Two Pointers · Approach: Sliding Compare
// Time: O(n*m) | Space: O(1)
// Source: https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/

function strStr(haystack: string, needle: string): number {
  const n = haystack.length;
  const m = needle.length;
  for (let i = 0; i + m <= n; i++) {
    let j = 0;
    while (j < m && haystack[i + j] === needle[j]) j++;
    if (j === m) return i;
  }
  return -1;
}
