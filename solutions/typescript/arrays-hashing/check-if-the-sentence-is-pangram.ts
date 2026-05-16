// LeetCode 1832 — Check if the Sentence Is Pangram (Easy)
// Category: Arrays & Hashing · Approach: Hash Set
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/check-if-the-sentence-is-pangram/

function checkIfPangram(sentence: string): boolean {
  return new Set(sentence).size === 26;
}
