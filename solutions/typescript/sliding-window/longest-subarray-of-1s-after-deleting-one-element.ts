// LeetCode 1493 — Longest Subarray of 1's After Deleting One Element (Medium)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/

function longestSubarray(nums: number[]): number {
  let left = 0, zeros = 0, best = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > 1) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left);
  }
  return best;
}
