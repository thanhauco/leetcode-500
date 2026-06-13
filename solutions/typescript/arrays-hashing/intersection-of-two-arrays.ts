// LeetCode 349 — Intersection of Two Arrays (Easy)
// Category: Arrays & Hashing · Approach: Hash Set
// Time: O(n + m) | Space: O(n)
// Source: https://leetcode.com/problems/intersection-of-two-arrays/

function intersection(nums1: number[], nums2: number[]): number[] {
  const seen = new Set(nums1);
  const res = new Set<number>();
  for (const x of nums2) if (seen.has(x)) res.add(x);
  return [...res];
}
