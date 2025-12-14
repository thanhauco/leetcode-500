// LeetCode 70 — Climbing Stairs (Easy)
// Category: 1-D Dynamic Programming · Approach: Rolling DP
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/climbing-stairs/

function climbStairs(n: number): number {
  let prev2 = 1, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    [prev2, prev1] = [prev1, prev1 + prev2];
  }
  return prev1;
}
