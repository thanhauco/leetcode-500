// LeetCode 376 — Wiggle Subsequence (Medium)
// Category: Greedy · Approach: Up/down counters
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/wiggle-subsequence/

function wiggleMaxLength(nums: number[]): number {
  if (nums.length < 2) return nums.length;
  let up = 1;
  let down = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) up = down + 1;
    else if (nums[i] < nums[i - 1]) down = up + 1;
  }
  return Math.max(up, down);
}
