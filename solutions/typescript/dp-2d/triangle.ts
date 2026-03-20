// LeetCode 120 — Triangle (Medium)
// Category: 2-D Dynamic Programming · Approach: Bottom-Up DP
// Time: O(n^2) | Space: O(n)
// Source: https://leetcode.com/problems/triangle/

function minimumTotal(triangle: number[][]): number {
  const dp = [...triangle[triangle.length - 1]];
  for (let r = triangle.length - 2; r >= 0; r--) {
    for (let c = 0; c <= r; c++) {
      dp[c] = triangle[r][c] + Math.min(dp[c], dp[c + 1]);
    }
  }
  return dp[0];
}
