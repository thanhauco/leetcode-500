// LeetCode 746 — Min Cost Climbing Stairs (Easy)
// Category: 1-D Dynamic Programming · Approach: Rolling DP
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/min-cost-climbing-stairs/

function minCostClimbingStairs(cost: number[]): number {
  const n = cost.length;
  let a = 0, b = 0; // cost to reach step i-2 and i-1
  for (let i = 2; i <= n; i++) {
    const cur = Math.min(b + cost[i - 1], a + cost[i - 2]);
    a = b;
    b = cur;
  }
  return b;
}
