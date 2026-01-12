// LeetCode 219 — Contains Duplicate II (Easy)
// Category: Arrays & Hashing · Approach: Last-Seen Map
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/contains-duplicate-ii/

function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const last = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const prev = last.get(nums[i]);
    if (prev !== undefined && i - prev <= k) return true;
    last.set(nums[i], i);
  }
  return false;
}
