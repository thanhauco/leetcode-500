// LeetCode 205 — Isomorphic Strings (Easy)
// Category: Arrays & Hashing · Approach: Two Maps
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/isomorphic-strings/

function isIsomorphic(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const mapST = new Map<string, string>();
  const mapTS = new Map<string, string>();
  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if (mapST.has(a) || mapTS.has(b)) {
      if (mapST.get(a) !== b || mapTS.get(b) !== a) return false;
    } else {
      mapST.set(a, b);
      mapTS.set(b, a);
    }
  }
  return true;
}
