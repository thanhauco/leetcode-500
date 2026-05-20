// LeetCode 1262 — Greatest Sum Divisible by Three (Medium)
// Category: 1-D Dynamic Programming · Approach: Remainder DP
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/greatest-sum-divisible-by-three/

function maxSumDivThree(nums: number[]): number {
  let dp = [0, -Infinity, -Infinity];
  for (const x of nums) {
    const cur = dp.slice();
    for (let r = 0; r < 3; r++) {
      if (dp[r] === -Infinity) continue;
      const nr = (((dp[r] + x) % 3) + 3) % 3;
      cur[nr] = Math.max(cur[nr], dp[r] + x);
    }
    dp = cur;
  }
  return dp[0];
}
