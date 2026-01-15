// LeetCode 74 — Search a 2D Matrix (Medium)
// Category: Binary Search · Approach: Flattened Binary Search
// Time: O(log(m·n)) | Space: O(1)
// Source: https://leetcode.com/problems/search-a-2d-matrix/

function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length, n = matrix[0].length;
  let lo = 0, hi = m * n - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    if (val < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}
