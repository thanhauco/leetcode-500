// LeetCode 58 — Length of Last Word (Easy)
// Category: Arrays & Hashing · Approach: Reverse Scan
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/length-of-last-word/

function lengthOfLastWord(s: string): number {
  let i = s.length - 1;
  while (i >= 0 && s[i] === " ") i--;
  let length = 0;
  while (i >= 0 && s[i] !== " ") {
    length++;
    i--;
  }
  return length;
}
