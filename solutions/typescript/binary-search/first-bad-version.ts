// LeetCode 278 — First Bad Version (Easy)
// Category: Binary Search · Approach: Binary Search
// Time: O(log n) | Space: O(1)
// Source: https://leetcode.com/problems/first-bad-version/

function firstBadVersion(n: number, bad: number): number {
  const isBad = (v: number): boolean => v >= bad;
  let lo = 1, hi = n;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (isBad(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
