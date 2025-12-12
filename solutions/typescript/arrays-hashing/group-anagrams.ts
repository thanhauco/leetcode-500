// LeetCode 49 — Group Anagrams (Medium)
// Category: Arrays & Hashing · Approach: Sorted key
// Time: O(n·k log k) | Space: O(n·k)
// Source: https://leetcode.com/problems/group-anagrams/

function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const s of strs) {
    const key = s.split("").sort().join("");
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(s);
  }
  return [...groups.values()];
}
