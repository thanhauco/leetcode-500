// LeetCode 69 — Sqrt(x) (Easy)
// Category: Binary Search · Approach: Binary Search
// Time: O(log x) | Space: O(1)
// Source: https://leetcode.com/problems/sqrtx/

function mySqrt(x: number): number {
  if (x < 2) return x;
  let lo = 1, hi = Math.floor(x / 2), ans = 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (mid * mid <= x) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return ans;
}
