// LeetCode 438 — Find All Anagrams in a String (Medium)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/find-all-anagrams-in-a-string/

function findAnagrams(s: string, p: string): number[] {
  const res: number[] = [];
  if (s.length < p.length) return res;
  const need = new Array(26).fill(0);
  const win = new Array(26).fill(0);
  const a = "a".charCodeAt(0);
  for (const ch of p) need[ch.charCodeAt(0) - a]++;
  for (let i = 0; i < s.length; i++) {
    win[s.charCodeAt(i) - a]++;
    if (i >= p.length) win[s.charCodeAt(i - p.length) - a]--;
    if (i >= p.length - 1) {
      let match = true;
      for (let j = 0; j < 26; j++) {
        if (win[j] !== need[j]) { match = false; break; }
      }
      if (match) res.push(i - p.length + 1);
    }
  }
  return res;
}
