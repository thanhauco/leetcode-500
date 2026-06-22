// LeetCode 456 — 132 Pattern (Medium)
// Category: Stack · Approach: Monotonic Stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/132-pattern/

function find132pattern(nums: number[]): boolean {
  const stack: number[] = [];
  let third = -Infinity;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] < third) return true;
    while (stack.length && stack[stack.length - 1] < nums[i]) {
      third = stack.pop()!;
    }
    stack.push(nums[i]);
  }
  return false;
}
