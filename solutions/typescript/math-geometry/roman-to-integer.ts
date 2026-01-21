// LeetCode 13 — Roman to Integer (Easy)
// Category: Math & Geometry · Approach: Greedy Scan
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/roman-to-integer/

function romanToInt(s: string): number {
  const values: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
  };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    if (i + 1 < s.length && values[s[i]] < values[s[i + 1]]) {
      total -= values[s[i]];
    } else {
      total += values[s[i]];
    }
  }
  return total;
}
