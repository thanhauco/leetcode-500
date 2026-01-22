// LeetCode 1004 — Max Consecutive Ones III (Medium)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/max-consecutive-ones-iii/

function longestOnes(nums: number[], k: number): number {
  let left = 0, zeros = 0, res = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    res = Math.max(res, right - left + 1);
  }
  return res;
}
