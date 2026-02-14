// LeetCode 1011 — Capacity To Ship Packages Within D Days (Medium)
// Category: Binary Search · Approach: Binary search on answer
// Time: O(n log(sum)) | Space: O(1)
// Source: https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/

function shipWithinDays(weights: number[], days: number): number {
  const feasible = (cap: number): boolean => {
    let d = 1;
    let cur = 0;
    for (const w of weights) {
      if (cur + w > cap) {
        d++;
        cur = 0;
      }
      cur += w;
    }
    return d <= days;
  };
  let lo = Math.max(...weights);
  let hi = weights.reduce((a, b) => a + b, 0);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (feasible(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
