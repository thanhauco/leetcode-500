// LeetCode 42 — Trapping Rain Water (Hard)
// Category: Two Pointers · Approach: Two Pointers
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/trapping-rain-water/

function trap(height: number[]): number {
  let l = 0;
  let r = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let res = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      leftMax = Math.max(leftMax, height[l]);
      res += leftMax - height[l];
      l++;
    } else {
      rightMax = Math.max(rightMax, height[r]);
      res += rightMax - height[r];
      r--;
    }
  }
  return res;
}
