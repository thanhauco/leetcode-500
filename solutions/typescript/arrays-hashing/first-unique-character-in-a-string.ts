// LeetCode 387 — First Unique Character in a String (Easy)
// Category: Arrays & Hashing · Approach: Frequency Count
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/first-unique-character-in-a-string/

function firstUniqChar(s: string): number {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (counts.get(s[i]) === 1) return i;
  }
  return -1;
}
