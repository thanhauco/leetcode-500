// LeetCode 378 — Kth Smallest Element in a Sorted Matrix (Medium)
// Category: Heap / Priority Queue · Approach: Flatten + sort
// Time: O(n² log n) | Space: O(n²)
// Source: https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/

function kthSmallest(matrix: number[][], k: number): number {
  const flat: number[] = [];
  for (const row of matrix) for (const v of row) flat.push(v);
  flat.sort((a, b) => a - b);
  return flat[k - 1];
}
