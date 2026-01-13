// LeetCode 350 — Intersection of Two Arrays II (Easy)
// Category: Arrays & Hashing · Approach: Counting
// Time: O(m + n) | Space: O(min(m, n))
// Source: https://leetcode.com/problems/intersection-of-two-arrays-ii/

function intersect(nums1: number[], nums2: number[]): number[] {
  const counts = new Map<number, number>();
  for (const x of nums1) counts.set(x, (counts.get(x) ?? 0) + 1);
  const result: number[] = [];
  for (const x of nums2) {
    const c = counts.get(x) ?? 0;
    if (c > 0) {
      result.push(x);
      counts.set(x, c - 1);
    }
  }
  return result;
}
