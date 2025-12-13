// LeetCode 875 — Koko Eating Bananas (Medium)
// Category: Binary Search · Approach: Search on Answer
// Time: O(n log m) | Space: O(1)
// Source: https://leetcode.com/problems/koko-eating-bananas/

function minEatingSpeed(piles: number[], h: number): number {
  let lo = 1, hi = Math.max(...piles);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    const hours = piles.reduce((s, p) => s + Math.ceil(p / mid), 0);
    if (hours <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
