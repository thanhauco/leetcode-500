// LeetCode 524 — Longest Word in Dictionary through Deleting (Medium)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(d · n) | Space: O(1)
// Source: https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/

function findLongestWord(s: string, dictionary: string[]): string {
  let best = "";
  for (const word of dictionary) {
    let i = 0;
    for (let j = 0; j < s.length && i < word.length; j++) {
      if (s[j] === word[i]) i++;
    }
    if (i === word.length) {
      if (word.length > best.length || (word.length === best.length && word < best)) {
        best = word;
      }
    }
  }
  return best;
}
