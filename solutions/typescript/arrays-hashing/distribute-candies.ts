// LeetCode 575 — Distribute Candies (Easy)
// Category: Arrays & Hashing · Approach: Hash Set
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/distribute-candies/

function distributeCandies(candyType: number[]): number {
  const kinds = new Set(candyType).size;
  return Math.min(kinds, candyType.length / 2);
}
