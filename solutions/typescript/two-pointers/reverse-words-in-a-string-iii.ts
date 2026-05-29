// LeetCode 557 — Reverse Words in a String III (Easy)
// Category: Two Pointers · Approach: Split & Reverse
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/reverse-words-in-a-string-iii/

function reverseWords(s: string): string {
  return s
    .split(" ")
    .map((w) => w.split("").reverse().join(""))
    .join(" ");
}
