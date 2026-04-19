// LeetCode 1005 — Maximize Sum Of Array After K Negations (Easy)
// Category: Greedy · Approach: Sort + flip
// Time: O(n log n) | Space: O(1)
// Source: https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/

function largestSumAfterKNegations(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length && k > 0 && nums[i] < 0; i++) {
    nums[i] = -nums[i];
    k -= 1;
  }
  let total = nums.reduce((acc, x) => acc + x, 0);
  if (k % 2 === 1) total -= 2 * Math.min(...nums);
  return total;
}
