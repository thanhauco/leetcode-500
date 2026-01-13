// LeetCode 290 — Word Pattern (Easy)
// Category: Arrays & Hashing · Approach: Two Maps
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/word-pattern/

function wordPattern(pattern: string, s: string): boolean {
  const words = s.split(" ");
  if (pattern.length !== words.length) return false;
  const pToW = new Map<string, string>();
  const wToP = new Map<string, string>();
  for (let i = 0; i < pattern.length; i++) {
    const p = pattern[i], w = words[i];
    if (pToW.has(p) || wToP.has(w)) {
      if (pToW.get(p) !== w || wToP.get(w) !== p) return false;
    } else {
      pToW.set(p, w);
      wToP.set(w, p);
    }
  }
  return true;
}
