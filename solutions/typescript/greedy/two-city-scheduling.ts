// LeetCode 1029 — Two City Scheduling (Medium)
// Category: Greedy · Approach: Sort by difference
// Time: O(n log n) | Space: O(n)
// Source: https://leetcode.com/problems/two-city-scheduling/

function twoCitySchedCost(costs: number[][]): number {
  const sorted = costs.slice().sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));
  const n = sorted.length / 2;
  let total = 0;
  for (let i = 0; i < sorted.length; i++) {
    total += i < n ? sorted[i][0] : sorted[i][1];
  }
  return total;
}
