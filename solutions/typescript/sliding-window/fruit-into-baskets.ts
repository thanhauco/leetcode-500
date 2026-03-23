// LeetCode 904 — Fruit Into Baskets (Medium)
// Category: Sliding Window · Approach: Sliding Window
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/fruit-into-baskets/

function totalFruit(fruits: number[]): number {
  const counts = new Map<number, number>();
  let left = 0;
  let best = 0;
  for (let right = 0; right < fruits.length; right++) {
    counts.set(fruits[right], (counts.get(fruits[right]) ?? 0) + 1);
    while (counts.size > 2) {
      const g = fruits[left];
      counts.set(g, counts.get(g)! - 1);
      if (counts.get(g) === 0) counts.delete(g);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
