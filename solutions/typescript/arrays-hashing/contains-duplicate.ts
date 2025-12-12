// LeetCode 217 — Contains Duplicate (Easy)
// Category: Arrays & Hashing · Approach: Hash Set
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/contains-duplicate/

function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}
