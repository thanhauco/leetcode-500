// LeetCode 264 — Ugly Number II (Medium)
// Category: 1-D Dynamic Programming · Approach: Three Pointers DP
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/ugly-number-ii/

function nthUglyNumber(n: number): number {
  const dp = new Array<number>(n);
  dp[0] = 1;
  let i2 = 0, i3 = 0, i5 = 0;
  for (let i = 1; i < n; i++) {
    const a = dp[i2] * 2, b = dp[i3] * 3, c = dp[i5] * 5;
    const m = Math.min(a, b, c);
    dp[i] = m;
    if (m === a) i2++;
    if (m === b) i3++;
    if (m === c) i5++;
  }
  return dp[n - 1];
}
