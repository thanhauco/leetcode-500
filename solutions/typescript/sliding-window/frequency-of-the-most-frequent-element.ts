// LeetCode 1838 — Frequency of the Most Frequent Element (Medium)
// Category: Sliding Window · Approach: Sort + Sliding Window
// Time: O(n log n) | Space: O(1)
// Source: https://leetcode.com/problems/frequency-of-the-most-frequent-element/

function maxFrequency(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);
  let left = 0;
  let total = 0;
  let best = 1;
  for (let right = 0; right < nums.length; right++) {
    total += nums[right];
    while (nums[right] * (right - left + 1) - total > k) {
      total -= nums[left];
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
