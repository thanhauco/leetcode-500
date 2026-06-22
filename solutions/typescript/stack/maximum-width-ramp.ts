// LeetCode 962 — Maximum Width Ramp (Medium)
// Category: Stack · Approach: Monotonic Stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/maximum-width-ramp/

function maxWidthRamp(nums: number[]): number {
  const stack: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (stack.length === 0 || nums[stack[stack.length - 1]] > nums[i]) {
      stack.push(i);
    }
  }
  let res = 0;
  for (let j = nums.length - 1; j >= 0; j--) {
    while (stack.length && nums[stack[stack.length - 1]] <= nums[j]) {
      res = Math.max(res, j - stack.pop()!);
    }
  }
  return res;
}
