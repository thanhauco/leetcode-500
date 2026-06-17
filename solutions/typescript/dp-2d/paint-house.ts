// LeetCode 256 — Paint House (Medium)
// Category: 2-D Dynamic Programming · Approach: Rolling DP
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/paint-house/

function minCost(costs: number[][]): number {
  if (costs.length === 0) return 0;
  let [r, g, b] = costs[0];
  for (let i = 1; i < costs.length; i++) {
    const [cr, cg, cb] = costs[i];
    const nr = cr + Math.min(g, b);
    const ng = cg + Math.min(r, b);
    const nb = cb + Math.min(r, g);
    r = nr; g = ng; b = nb;
  }
  return Math.min(r, g, b);
}
