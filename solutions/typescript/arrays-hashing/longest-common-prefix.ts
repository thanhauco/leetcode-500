// LeetCode 14 — Longest Common Prefix (Easy)
// Category: Arrays & Hashing · Approach: Horizontal Scan
// Time: O(S) | Space: O(1)
// Source: https://leetcode.com/problems/longest-common-prefix/

function longestCommonPrefix(strs: string[]): string {
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}
