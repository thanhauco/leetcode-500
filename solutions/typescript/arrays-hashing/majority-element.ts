// LeetCode 169 — Majority Element (Easy)
// Category: Arrays & Hashing · Approach: Boyer-Moore
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/majority-element/

function majorityElement(nums: number[]): number {
  let candidate = 0, count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}
