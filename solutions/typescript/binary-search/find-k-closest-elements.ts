// LeetCode 658 — Find K Closest Elements (Medium)
// Category: Binary Search · Approach: Binary Search Window
// Time: O(log(n − k) + k) | Space: O(k)
// Source: https://leetcode.com/problems/find-k-closest-elements/

function findClosestElements(arr: number[], k: number, x: number): number[] {
  let lo = 0, hi = arr.length - k;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (x - arr[mid] > arr[mid + k] - x) lo = mid + 1;
    else hi = mid;
  }
  return arr.slice(lo, lo + k);
}
