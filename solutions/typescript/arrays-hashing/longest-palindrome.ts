// LeetCode 409 — Longest Palindrome (Easy)
// Category: Arrays & Hashing · Approach: Counting
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/longest-palindrome/

function longestPalindrome(s: string): number {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  let length = 0;
  let hasOdd = false;
  for (const c of counts.values()) {
    length += Math.floor(c / 2) * 2;
    if (c % 2 === 1) hasOdd = true;
  }
  return length + (hasOdd ? 1 : 0);
}
