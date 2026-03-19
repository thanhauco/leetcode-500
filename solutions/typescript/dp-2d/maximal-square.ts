// LeetCode 221 — Maximal Square (Medium)
// Category: 2-D Dynamic Programming · Approach: 2-D DP
// Time: O(rows * cols) | Space: O(rows * cols)
// Source: https://leetcode.com/problems/maximal-square/

function maximalSquare(matrix: string[][]): number {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const dp: number[][] = Array.from({ length: rows + 1 }, () => new Array<number>(cols + 1).fill(0));
  let best = 0;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (matrix[i - 1][j - 1] === "1") {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        best = Math.max(best, dp[i][j]);
      }
    }
  }
  return best * best;
}
