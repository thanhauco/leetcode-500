// LeetCode 215 — Kth Largest Element in an Array (Medium)
// Category: Heap / Priority Queue · Approach: Sort (clear) / heap (optimal)
// Time: O(n log k) | Space: O(k)
// Source: https://leetcode.com/problems/kth-largest-element-in-an-array/

function findKthLargest(nums: number[], k: number): number {
  // Clear O(n log n). For O(n log k) use a size-k min-heap.
  return [...nums].sort((a, b) => b - a)[k - 1];
}
