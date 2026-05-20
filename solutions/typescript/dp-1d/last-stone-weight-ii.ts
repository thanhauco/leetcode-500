// LeetCode 1049 — Last Stone Weight II (Medium)
// Category: 1-D Dynamic Programming · Approach: Subset Sum
// Time: O(n * sum) | Space: O(sum)
// Source: https://leetcode.com/problems/last-stone-weight-ii/

function lastStoneWeightII(stones: number[]): number {
  const total = stones.reduce((a, b) => a + b, 0);
  const t = Math.floor(total / 2);
  const dp = new Array<boolean>(t + 1).fill(false);
  dp[0] = true;
  for (const x of stones) {
    for (let j = t; j >= x; j--) dp[j] = dp[j] || dp[j - x];
  }
  for (let j = t; j >= 0; j--) if (dp[j]) return total - 2 * j;
  return total;
}
