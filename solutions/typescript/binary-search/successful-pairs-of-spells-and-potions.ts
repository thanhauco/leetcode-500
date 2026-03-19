// LeetCode 2300 — Successful Pairs of Spells and Potions (Medium)
// Category: Binary Search · Approach: Sort + binary search
// Time: O((n + m) log m) | Space: O(m)
// Source: https://leetcode.com/problems/successful-pairs-of-spells-and-potions/

function successfulPairs(spells: number[], potions: number[], success: number): number[] {
  const sorted = potions.slice().sort((a, b) => a - b);
  const m = sorted.length;
  const res: number[] = [];
  for (const sp of spells) {
    let lo = 0;
    let hi = m;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (sp * sorted[mid] >= success) hi = mid;
      else lo = mid + 1;
    }
    res.push(m - lo);
  }
  return res;
}
