// LeetCode 560 — Subarray Sum Equals K (Medium)
// Category: Arrays & Hashing · Approach: Prefix Sum
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/subarray-sum-equals-k/

function subarraySum(nums: number[], k: number): number {
  const counts = new Map<number, number>([[0, 1]]);
  let total = 0;
  let res = 0;
  for (const x of nums) {
    total += x;
    res += counts.get(total - k) ?? 0;
    counts.set(total, (counts.get(total) ?? 0) + 1);
  }
  return res;
}
