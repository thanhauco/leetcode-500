// LeetCode 520 — Detect Capital (Easy)
// Category: Arrays & Hashing · Approach: Pattern Check
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/detect-capital/

function detectCapitalUse(word: string): boolean {
  if (word === word.toUpperCase()) return true;
  if (word === word.toLowerCase()) return true;
  return (
    word[0] === word[0].toUpperCase() &&
    word.slice(1) === word.slice(1).toLowerCase()
  );
}
