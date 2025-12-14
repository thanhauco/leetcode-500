// LeetCode 62 — Unique Paths (Medium)
// Category: 2-D Dynamic Programming · Approach: Rolling Row DP
// Time: O(m·n) | Space: O(n)
// Source: https://leetcode.com/problems/unique-paths/

function uniquePaths(m: number, n: number): number {
  const row = new Array<number>(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      row[c] += row[c - 1];
    }
  }
  return row[n - 1];
}
