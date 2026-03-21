// LeetCode 1337 — The K Weakest Rows in a Matrix (Easy)
// Category: Heap / Priority Queue · Approach: Sort by strength
// Time: O(m·n + m log m) | Space: O(m)
// Source: https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/

function kWeakestRows(mat: number[][], k: number): number[] {
  const rows = mat.map((row, i) => [row.reduce((a, b) => a + b, 0), i]);
  rows.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return rows.slice(0, k).map((r) => r[1]);
}
