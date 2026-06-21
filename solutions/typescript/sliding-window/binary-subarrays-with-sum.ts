// LeetCode 930 — Binary Subarrays With Sum (Medium)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/binary-subarrays-with-sum/

function numSubarraysWithSum(nums: number[], goal: number): number {
  const atMost = (g: number): number => {
    if (g < 0) return 0;
    let left = 0;
    let sum = 0;
    let count = 0;
    for (let right = 0; right < nums.length; right++) {
      sum += nums[right];
      while (sum > g) {
        sum -= nums[left];
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };
  return atMost(goal) - atMost(goal - 1);
}
