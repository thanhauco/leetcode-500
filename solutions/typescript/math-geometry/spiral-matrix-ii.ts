// LeetCode 59 — Spiral Matrix II (Medium)
// Category: Math & Geometry · Approach: Boundary Simulation
// Time: O(n^2) | Space: O(1)
// Source: https://leetcode.com/problems/spiral-matrix-ii/

function generateMatrix(n: number): number[][] {
  const grid: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
  let top = 0;
  let bottom = n - 1;
  let left = 0;
  let right = n - 1;
  let val = 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) grid[top][c] = val++;
    top++;
    for (let r = top; r <= bottom; r++) grid[r][right] = val++;
    right--;
    for (let c = right; c >= left; c--) grid[bottom][c] = val++;
    bottom--;
    for (let r = bottom; r >= top; r--) grid[r][left] = val++;
    left++;
  }
  return grid;
}
