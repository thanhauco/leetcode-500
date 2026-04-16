// LeetCode 1539 — Kth Missing Positive Number (Easy)
// Category: Binary Search · Approach: Binary Search
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/kth-missing-positive-number/

function findKthPositive(arr: number[], k: number): number {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] - (mid + 1) < k) lo = mid + 1;
    else hi = mid;
  }
  return lo + k;
}
