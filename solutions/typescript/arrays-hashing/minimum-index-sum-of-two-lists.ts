// LeetCode 599 — Minimum Index Sum of Two Lists (Medium)
// Category: Arrays & Hashing · Approach: Hash Map
// Time: O(n + m) | Space: O(n)
// Source: https://leetcode.com/problems/minimum-index-sum-of-two-lists/

function findRestaurant(list1: string[], list2: string[]): string[] {
  const index = new Map<string, number>();
  list1.forEach((w, i) => index.set(w, i));
  let best = Infinity;
  let result: string[] = [];
  list2.forEach((w, j) => {
    if (index.has(w)) {
      const s = index.get(w)! + j;
      if (s < best) { best = s; result = [w]; }
      else if (s === best) result.push(w);
    }
  });
  return result;
}
