// LeetCode 338 — Counting Bits (Easy)
// Category: Bit Manipulation · Approach: DP on Bits
// Time: O(n) | Space: O(n)
// Source: https://leetcode.com/problems/counting-bits/

function countBits(n: number): number[] {
  const ans = new Array<number>(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
}
