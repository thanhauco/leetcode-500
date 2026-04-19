// LeetCode 1020 — Number of Enclaves (Medium)
// Category: Graphs · Approach: Border flood fill
// Time: O(m·n) | Space: O(m·n)
// Source: https://leetcode.com/problems/number-of-enclaves/

function numEnclaves(grid: number[][]): number {
  const g = grid.map((row) => row.slice());
  const m = g.length;
  const n = g[0].length;
  const dfs = (r: number, c: number): void => {
    if (r < 0 || r >= m || c < 0 || c >= n || g[r][c] === 0) return;
    g[r][c] = 0;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let i = 0; i < m; i++) {
    dfs(i, 0);
    dfs(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j);
    dfs(m - 1, j);
  }
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (g[i][j] === 1) count++;
    }
  }
  return count;
}
