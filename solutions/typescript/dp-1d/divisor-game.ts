// LeetCode 1025 — Divisor Game (Easy)
// Category: 1-D Dynamic Programming · Approach: Bottom-up DP
// Time: O(n^2) | Space: O(n)
// Source: https://leetcode.com/problems/divisor-game/

function divisorGame(n: number): boolean {
  const dp = new Array<boolean>(n + 1).fill(false);
  for (let i = 2; i <= n; i++) {
    for (let x = 1; x < i; x++) {
      if (i % x === 0 && !dp[i - x]) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}
