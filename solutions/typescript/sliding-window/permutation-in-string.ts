// LeetCode 567 — Permutation in String (Medium)
// Category: Sliding Window · Approach: Fixed Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/permutation-in-string/

function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;
  const need = new Array(26).fill(0);
  const win = new Array(26).fill(0);
  const a = "a".charCodeAt(0);
  for (const c of s1) need[c.charCodeAt(0) - a]++;
  for (let i = 0; i < s2.length; i++) {
    win[s2.charCodeAt(i) - a]++;
    if (i >= s1.length) win[s2.charCodeAt(i - s1.length) - a]--;
    if (i >= s1.length - 1 && need.every((v, j) => v === win[j])) return true;
  }
  return false;
}
