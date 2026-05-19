// LeetCode 374 — Guess Number Higher or Lower (Easy)
// Category: Binary Search · Approach: Binary Search
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/guess-number-higher-or-lower/

function guessNumber(n: number, pick: number): number {
  const guess = (num: number): number => (num === pick ? 0 : num > pick ? -1 : 1);
  let lo = 1, hi = n;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    const g = guess(mid);
    if (g === 0) return mid;
    if (g < 0) hi = mid - 1;
    else lo = mid + 1;
  }
  return lo;
}
