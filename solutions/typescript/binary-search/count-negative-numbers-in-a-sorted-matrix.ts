// LeetCode 1351 — Count Negative Numbers in a Sorted Matrix (Easy)
// Category: Binary Search · Approach: Count
// Time: O(m * n) | Space: O(1)
// Source: https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/

function countNegatives(grid: number[][]): number {
  let count = 0;
  for (const row of grid) for (const v of row) if (v < 0) count++;
  return count;
}
