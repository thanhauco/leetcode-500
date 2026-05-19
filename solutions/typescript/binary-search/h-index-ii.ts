// LeetCode 275 — H-Index II (Medium)
// Category: Binary Search · Approach: Binary Search
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/h-index-ii/

function hIndex(citations: number[]): number {
  const n = citations.length;
  let lo = 0, hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (citations[mid] >= n - mid) hi = mid;
    else lo = mid + 1;
  }
  return n - lo;
}
