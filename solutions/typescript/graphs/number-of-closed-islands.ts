// LeetCode 1254 — Number of Closed Islands (Medium)
// Category: Graphs · Approach: Border flood fill
// Time: O(m·n) | Space: O(m·n)
// Source: https://leetcode.com/problems/number-of-closed-islands/

function closedIsland(grid: number[][]): number {
  const g = grid.map((row) => row.slice());
  const m = g.length;
  const n = g[0].length;
  const flood = (r: number, c: number): void => {
    if (r < 0 || r >= m || c < 0 || c >= n || g[r][c] !== 0) return;
    g[r][c] = 1;
    flood(r + 1, c);
    flood(r - 1, c);
    flood(r, c + 1);
    flood(r, c - 1);
  };
  for (let i = 0; i < m; i++) {
    flood(i, 0);
    flood(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    flood(0, j);
    flood(m - 1, j);
  }
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (g[i][j] === 0) {
        count++;
        flood(i, j);
      }
    }
  }
  return count;
}
