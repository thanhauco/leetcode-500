// LeetCode 1283 — Find the Smallest Divisor Given a Threshold (Medium)
// Category: Binary Search · Approach: Binary search on answer
// Time: O(n log(maxNum)) | Space: O(1)
// Source: https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/

function smallestDivisor(nums: number[], threshold: number): number {
  let lo = 1;
  let hi = Math.max(...nums);
  const total = (d: number): number => nums.reduce((acc, x) => acc + Math.ceil(x / d), 0);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (total(mid) <= threshold) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
