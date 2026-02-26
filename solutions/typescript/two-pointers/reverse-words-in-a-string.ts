// LeetCode 151 — Reverse Words in a String (Medium)
// Category: Two Pointers · Approach: Split & Reverse
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/reverse-words-in-a-string/

function reverseWords(s: string): string {
  return s.trim().split(/\s+/).reverse().join(" ");
}
