// LeetCode 242 — Valid Anagram (Easy)
// Category: Arrays & Hashing · Approach: Frequency map
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/valid-anagram/

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count = new Map<string, number>();
  for (const c of s) count.set(c, (count.get(c) ?? 0) + 1);
  for (const c of t) {
    const n = count.get(c) ?? 0;
    if (n === 0) return false;
    count.set(c, n - 1);
  }
  return true;
}
