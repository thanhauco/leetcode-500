// LeetCode 84 — Largest Rectangle in Histogram (Hard)
// Category: Stack · Approach: Monotonic stack
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/largest-rectangle-in-histogram/

function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let maxArea = 0;
  const n = heights.length;
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] >= h) {
      const top = stack.pop()!;
      const height = heights[top];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}
