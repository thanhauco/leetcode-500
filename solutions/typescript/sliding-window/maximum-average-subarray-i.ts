// LeetCode 643 — Maximum Average Subarray I (Easy)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/maximum-average-subarray-i/

function findMaxAverage(nums: number[], k: number): number {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    best = Math.max(best, sum);
  }
  return best / k;
}
