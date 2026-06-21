// LeetCode 1248 — Count Number of Nice Subarrays (Medium)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/count-number-of-nice-subarrays/

function numberOfSubarrays(nums: number[], k: number): number {
  const atMost = (g: number): number => {
    if (g < 0) return 0;
    let left = 0;
    let odd = 0;
    let count = 0;
    for (let right = 0; right < nums.length; right++) {
      odd += nums[right] % 2;
      while (odd > g) {
        odd -= nums[left] % 2;
        left++;
      }
      count += right - left + 1;
    }
    return count;
  };
  return atMost(k) - atMost(k - 1);
}
