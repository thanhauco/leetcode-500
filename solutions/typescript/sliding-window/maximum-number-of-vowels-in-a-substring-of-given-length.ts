// LeetCode 1456 — Maximum Number of Vowels in a Substring of Given Length (Medium)
// Category: Sliding Window · Approach: Fixed Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/

function maxVowels(s: string, k: number): number {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let count = 0;
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    if (vowels.has(s[i])) count++;
    if (i >= k && vowels.has(s[i - k])) count--;
    if (i >= k - 1) best = Math.max(best, count);
  }
  return best;
}
