// LeetCode 918 — Maximum Sum Circular Subarray (Medium)
// Category: 1-D Dynamic Programming · Approach: Dual Kadane
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/maximum-sum-circular-subarray/

function maxSubarraySumCircular(nums: number[]): number {
  let total = 0;
  let curMax = 0, maxSum = -Infinity;
  let curMin = 0, minSum = Infinity;
  for (const x of nums) {
    curMax = Math.max(curMax + x, x);
    maxSum = Math.max(maxSum, curMax);
    curMin = Math.min(curMin + x, x);
    minSum = Math.min(minSum, curMin);
    total += x;
  }
  return maxSum < 0 ? maxSum : Math.max(maxSum, total - minSum);
}
