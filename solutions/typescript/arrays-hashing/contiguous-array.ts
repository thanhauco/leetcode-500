// LeetCode 525 — Contiguous Array (Medium)
// Category: Arrays & Hashing · Approach: Prefix Sum
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/contiguous-array/

function findMaxLength(nums: number[]): number {
  const first = new Map<number, number>([[0, -1]]);
  let count = 0;
  let best = 0;
  for (let i = 0; i < nums.length; i++) {
    count += nums[i] === 1 ? 1 : -1;
    if (first.has(count)) best = Math.max(best, i - first.get(count)!);
    else first.set(count, i);
  }
  return best;
}
