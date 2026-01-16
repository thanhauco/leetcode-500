// LeetCode 367 — Valid Perfect Square (Easy)
// Category: Binary Search · Approach: Binary Search
// Time: O(log num) | Space: O(1)
// Source: https://leetcode.com/problems/valid-perfect-square/

function isPerfectSquare(num: number): boolean {
  let lo = 1, hi = num;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const sq = mid * mid;
    if (sq === num) return true;
    if (sq < num) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}
