// LeetCode 1482 — Minimum Number of Days to Make m Bouquets (Medium)
// Category: Binary Search · Approach: Binary search on answer
// Time: O(n log(maxDay)) | Space: O(1)
// Source: https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/

function minDays(bloomDay: number[], m: number, k: number): number {
  const n = bloomDay.length;
  if (m * k > n) return -1;
  const canMake = (day: number): boolean => {
    let bouquets = 0;
    let flowers = 0;
    for (const b of bloomDay) {
      if (b <= day) {
        flowers++;
        if (flowers === k) {
          bouquets++;
          flowers = 0;
        }
      } else {
        flowers = 0;
      }
    }
    return bouquets >= m;
  };
  let lo = Math.min(...bloomDay);
  let hi = Math.max(...bloomDay);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (canMake(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
