// LeetCode 174 — Dungeon Game (Hard)
// Category: 2-D Dynamic Programming · Approach: Backward Grid DP
// Time: O(n * m) | Space: O(n * m)
// Source: https://leetcode.com/problems/dungeon-game/

function calculateMinimumHP(dungeon: number[][]): number {
  const n = dungeon.length, m = dungeon[0].length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(Infinity));
  dp[n][m - 1] = 1;
  dp[n - 1][m] = 1;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      const need = Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
      dp[i][j] = need <= 0 ? 1 : need;
    }
  }
  return dp[0][0];
}
