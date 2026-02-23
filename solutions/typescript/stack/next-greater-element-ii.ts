// LeetCode 503 — Next Greater Element II (Medium)
// Category: Stack · Approach: Monotonic stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/next-greater-element-ii/

function nextGreaterElements(nums: number[]): number[] {
  const n = nums.length;
  const res = new Array<number>(n).fill(-1);
  const stack: number[] = [];
  for (let i = 0; i < 2 * n; i++) {
    const cur = nums[i % n];
    while (stack.length && nums[stack[stack.length - 1]] < cur) {
      res[stack.pop()!] = cur;
    }
    if (i < n) stack.push(i);
  }
  return res;
}
