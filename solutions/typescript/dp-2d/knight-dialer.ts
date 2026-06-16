// LeetCode 935 — Knight Dialer (Medium)
// Category: 2-D Dynamic Programming · Approach: Layered DP
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/knight-dialer/

function knightDialer(n: number): number {
  const MOD = 1000000007n;
  const moves: number[][] = [[4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9],
    [], [0, 1, 7], [2, 6], [1, 3], [2, 4]];
  let dp: bigint[] = new Array(10).fill(1n);
  for (let step = 1; step < n; step++) {
    const next: bigint[] = new Array(10).fill(0n);
    for (let d = 0; d < 10; d++) {
      for (const m of moves[d]) next[m] = (next[m] + dp[d]) % MOD;
    }
    dp = next;
  }
  return Number(dp.reduce((a, b) => (a + b) % MOD, 0n));
}
