// LeetCode 852 — Peak Index in a Mountain Array (Medium)
// Category: Binary Search · Approach: Binary Search
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/peak-index-in-a-mountain-array/

function peakIndexInMountainArray(arr: number[]): number {
  let lo = 0, hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < arr[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
