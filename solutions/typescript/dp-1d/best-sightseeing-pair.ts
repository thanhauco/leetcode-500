// LeetCode 1014 — Best Sightseeing Pair (Medium)
// Category: 1-D Dynamic Programming · Approach: Running best
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/best-sightseeing-pair/

function maxScoreSightseeingPair(values: number[]): number {
  let best = values[0];
  let ans = -Infinity;
  for (let j = 1; j < values.length; j++) {
    ans = Math.max(ans, best + values[j] - j);
    best = Math.max(best, values[j] + j);
  }
  return ans;
}
