// LeetCode 48 — Rotate Image (Medium)
// Category: Math & Geometry · Approach: Transpose + Reverse
// Time: O(n²) | Space: O(1)
// Source: https://leetcode.com/problems/rotate-image/

function rotate(matrix: number[][]): void {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (const row of matrix) row.reverse();
}
