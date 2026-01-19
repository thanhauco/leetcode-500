// LeetCode 973 — K Closest Points to Origin (Medium)
// Category: Heap / Priority Queue · Approach: Sort by squared distance
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/k-closest-points-to-origin/

function kClosest(points: number[][], k: number): number[][] {
  return [...points]
    .sort((a, b) => a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]))
    .slice(0, k);
}
