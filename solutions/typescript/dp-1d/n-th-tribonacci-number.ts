// LeetCode 1137 — N-th Tribonacci Number (Easy)
// Category: 1-D Dynamic Programming · Approach: Rolling DP
// Time: O(n) | Space: O(1)
// Source: https://leetcode.com/problems/n-th-tribonacci-number/

function tribonacci(n: number): number {
  if (n === 0) return 0;
  if (n <= 2) return 1;
  let a = 0, b = 1, c = 1;
  for (let i = 3; i <= n; i++) {
    const next = a + b + c;
    a = b; b = c; c = next;
  }
  return c;
}
