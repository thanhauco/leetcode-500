// LeetCode 240 — Search a 2D Matrix II (Medium)
// Category: Binary Search · Approach: Staircase
// Time: O(m + n) | Space: O(1)
// Source: https://leetcode.com/problems/search-a-2d-matrix-ii/

function searchMatrix(matrix: number[][], target: number): boolean {
  if (!matrix.length || !matrix[0].length) return false;
  let r = 0, c = matrix[0].length - 1;
  while (r < matrix.length && c >= 0) {
    const v = matrix[r][c];
    if (v === target) return true;
    if (v > target) c--;
    else r++;
  }
  return false;
}
