// LeetCode 983 — Minimum Cost For Tickets (Medium)
// Category: 1-D Dynamic Programming · Approach: Calendar DP
// Time: O(last day) | Space: O(last day)
// Source: https://leetcode.com/problems/minimum-cost-for-tickets/

function mincostTickets(days: number[], costs: number[]): number {
  const daySet = new Set(days);
  const last = days[days.length - 1];
  const dp = new Array<number>(last + 1).fill(0);
  for (let d = 1; d <= last; d++) {
    if (!daySet.has(d)) {
      dp[d] = dp[d - 1];
      continue;
    }
    dp[d] = Math.min(
      dp[d - 1] + costs[0],
      dp[Math.max(0, d - 7)] + costs[1],
      dp[Math.max(0, d - 30)] + costs[2],
    );
  }
  return dp[last];
}
