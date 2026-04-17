// LeetCode 477 — Total Hamming Distance (Medium)
// Category: Bit Manipulation · Approach: Per-bit counting
// Time: O(32n) | Space: O(1)
// Source: https://leetcode.com/problems/total-hamming-distance/

function totalHammingDistance(nums: number[]): number {
  const n = nums.length;
  let total = 0;
  for (let bit = 0; bit < 32; bit++) {
    let ones = 0;
    for (const x of nums) ones += (x >> bit) & 1;
    total += ones * (n - ones);
  }
  return total;
}
