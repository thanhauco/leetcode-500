// LeetCode 441 — Arranging Coins (Easy)
// Category: Binary Search · Approach: Binary search
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/arranging-coins/

function arrangeCoins(n: number): number {
  let lo = 0;
  let hi = n;
  while (lo < hi) {
    const mid = lo + Math.ceil((hi - lo) / 2);
    if ((mid * (mid + 1)) / 2 <= n) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}
