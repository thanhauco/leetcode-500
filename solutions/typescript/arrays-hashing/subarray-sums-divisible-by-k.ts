// LeetCode 974 — Subarray Sums Divisible by K (Medium)
// Category: Arrays & Hashing · Approach: Prefix Remainders
// Time: O(n) | Space: O(k)
// Source: https://leetcode.com/problems/subarray-sums-divisible-by-k/

function subarraysDivByK(nums: number[], k: number): number {
  const counts = new Map<number, number>([[0, 1]]);
  let total = 0;
  let res = 0;
  for (const x of nums) {
    total += x;
    const r = ((total % k) + k) % k;
    res += counts.get(r) ?? 0;
    counts.set(r, (counts.get(r) ?? 0) + 1);
  }
  return res;
}
