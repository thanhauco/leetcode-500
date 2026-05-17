// LeetCode 771 — Jewels and Stones (Easy)
// Category: Arrays & Hashing · Approach: Hash Set
// Time: O(j + s) | Space: O(j)
// Source: https://leetcode.com/problems/jewels-and-stones/

function numJewelsInStones(jewels: string, stones: string): number {
  const jewelSet = new Set(jewels);
  let count = 0;
  for (const s of stones) if (jewelSet.has(s)) count++;
  return count;
}
